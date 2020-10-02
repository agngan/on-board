package com.onboard.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboard.configurations.ClientConfig;
import com.onboard.entities.Game;
import com.onboard.entities.Win;
import com.onboard.projections.MyGamesRecord;
import com.onboard.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
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
import java.util.*;
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

        for (Game game : userRepository.findByUsername(username).getGames()) {
            MyGamesRecord myGamesRecord = getMyGamesRecord(game, username);
            if (myGamesRecord == null)
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            else
                myGamesRecords.add(myGamesRecord);
        }
        return new ResponseEntity<>(myGamesRecords, HttpStatus.OK);
    }

    private MyGamesRecord getMyGamesRecord(Game game, String username) {
        String imagePath;
        long myScore;
        TopPlayerWithScore topPlayerWithScore = new TopPlayerWithScore("No winners", 0L);
        LocalDate latestWinDate;

        imagePath = getImagePath(game.getApiId());
        if (imagePath == null)
            return null;

        Map<String, List<Win>> userWinsMap = game.getWins().stream().collect(Collectors.groupingBy(win -> win.getUser().getUsername()));
        myScore = userWinsMap.get(username).size();
        updateTopPlayerWithScore(topPlayerWithScore, userWinsMap);
        latestWinDate = getLatestWinDate(username, userWinsMap);

        return new MyGamesRecord(game.getId(), game.getName(), imagePath, myScore, topPlayerWithScore.getBestScore(), topPlayerWithScore.getTopPlayer(), latestWinDate);
    }

    private String getImagePath(String ids) {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> parameters = getParametersMap(ids, objectMapper);
        if (parameters == null)
            return null;

        String resultJson = restTemplate.getForObject("/search?ids={ids}&client_id={client_id}", String.class, parameters);
        if (resultJson == null)
            return null;

        Map<String, List<Map<String, Object>>> resultMap;
        try {
            resultMap = objectMapper.readValue(resultJson, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            return null;
        }

        return resultMap.get("games").get(0).get("image_url").toString();
    }

    private Map<String, String> getParametersMap(String ids, ObjectMapper objectMapper) {
        Map<String, String> parameters = new HashMap<>();
        try {
            parameters.put("client_id", new ClientConfig().getApiKey());
        } catch (IOException e) {
            return null;
        }
        parameters.put("ids", ids);
        return parameters;
    }

    private void updateTopPlayerWithScore(TopPlayerWithScore topPlayerWithScore, Map<String, List<Win>> userWinsMap) {
        for (Map.Entry<String, List<Win>> entry : userWinsMap.entrySet()) {
            int score = entry.getValue().size();
            if (score > topPlayerWithScore.getBestScore()) {
                topPlayerWithScore.setBestScore(score);
                topPlayerWithScore.setTopPlayer(entry.getKey());

            } else if (score != 0 && score == topPlayerWithScore.getBestScore()) {
                Optional<Win> currentPlayerLatestWin = entry.getValue().stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
                Optional<Win> topPlayerLatestWin = userWinsMap.get(topPlayerWithScore.getTopPlayer()).stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
                if (currentPlayerLatestWin.get().getDate().compareTo(topPlayerLatestWin.get().getDate()) < 0) {
                    topPlayerWithScore.setTopPlayer(currentPlayerLatestWin.get().getUser().getUsername());
                }
            }
        }
    }

    private LocalDate getLatestWinDate(String username, Map<String, List<Win>> userWinsMap) {
        Optional<Win> latestWin = userWinsMap.get(username).stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
        return latestWin.map(Win::getDate).orElse(null);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    private class TopPlayerWithScore {
        String topPlayer;
        long bestScore;
    }
}
