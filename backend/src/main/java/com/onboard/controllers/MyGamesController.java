package com.onboard.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboard.entities.Game;
import com.onboard.entities.User;
import com.onboard.entities.Win;
import com.onboard.projections.MyGamesRecord;
import com.onboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${spring.data.rest.base-path}/myGames")
public class MyGamesController {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public MyGamesController(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<MyGamesRecord>> getMyGames(@PathVariable("username") String username) {
        List<MyGamesRecord> myGamesRecords = new ArrayList<>();

        if (!userRepository.existsByUsername(username)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.findByUsername(username);

        for (Game game : user.getGames()) {
            String imagePath;
            long myScore;
            long bestScore = 0L;
            String topPlayer = "No winners";
            LocalDate latestWinDate = null;

            try {
                imagePath = getImagePath(game.getApiId());
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (imagePath == null)
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

            Map<String, List<Win>> userWinsMap = game.getWins().stream().collect(Collectors.groupingBy(win -> win.getUser().getUsername()));

//            myScore = game.getWins().stream().filter(win -> win.getUser().getUsername().equals(username)).count();
            myScore = userWinsMap.get(username).size();

            for (Map.Entry<String, List<Win>> entry : userWinsMap.entrySet()) {
                int score = entry.getValue().size();
                if (score > bestScore) {
                    bestScore = (long) score;
                    topPlayer = entry.getKey();
                } else if (score != 0 && score == bestScore) {
                    Optional<Win> currentPlayerLatestWin = entry.getValue().stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
                    Optional<Win> topPlayerLatestWin = userWinsMap.get(topPlayer).stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
                    if (currentPlayerLatestWin.get().getDate().compareTo(topPlayerLatestWin.get().getDate()) < 0) {
                        topPlayer = currentPlayerLatestWin.get().getUser().getUsername();
                    }
                }
            }

            Optional<Win> latestWin = userWinsMap.get(username).stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
            if (latestWin.isPresent()) {
                latestWinDate = latestWin.get().getDate();
            }

            myGamesRecords.add(new MyGamesRecord(game.getId(), game.getName(), imagePath, myScore, bestScore, topPlayer, latestWinDate));
        }
        return new ResponseEntity<>(myGamesRecords, HttpStatus.OK);
    }

    private String getImagePath(String ids) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> parameters = getParametersMap(ids, objectMapper);
        if (parameters == null)
            return null;

        String resultJson = restTemplate.getForObject("/search?ids={ids}&client_id={client_id}", String.class, parameters);
        if (resultJson == null)
            return null;

        Map<String, List<Map<String, Object>>> resultMap = objectMapper.readValue(resultJson, new TypeReference<>() {
        });
        return resultMap.get("games").get(0).get("image_url").toString();
    }

    private Map<String, String> getParametersMap(String ids, ObjectMapper objectMapper) throws IOException {
        // TODO: should it be somewhere else?
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("apiKey.yml");
        if (inputStream == null) {
            return null;
        }
        Map<String, String> parameters = objectMapper.readValue(inputStream, new TypeReference<>() {
        });
        parameters.put("ids", ids);
        return parameters;
    }
}
