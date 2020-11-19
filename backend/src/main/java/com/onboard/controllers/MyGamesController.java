package com.onboard.controllers;

import com.onboard.entities.Game;
import com.onboard.entities.User;
import com.onboard.entities.Win;
import com.onboard.pojos.GameToAdd;
import com.onboard.pojos.MyGamesRecord;
import com.onboard.repositories.GameRepository;
import com.onboard.repositories.UserRepository;
import com.onboard.repositories.WinRepository;
import com.onboard.services.BoardGameAtlasAPICommunicationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Long.valueOf;

@Slf4j
@RestController
@RequestMapping("${spring.data.rest.base-path}/myGames")
public class MyGamesController {

    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final WinRepository winRepository;
    private final BoardGameAtlasAPICommunicationService bgaService;

    @Autowired
    public MyGamesController(UserRepository userRepository, GameRepository gameRepository, WinRepository winRepository, BoardGameAtlasAPICommunicationService bgaService) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.winRepository = winRepository;
        this.bgaService = bgaService;
    }

    @PostMapping("/{username}/add")
    public void addGame(@PathVariable String username, @RequestBody GameToAdd gameToAdd) {
        if (gameToAdd.getId().matches("^[0-9]*$") && gameRepository.existsById(valueOf(gameToAdd.getId()))) {
            Game game = gameRepository.getById(valueOf(gameToAdd.getId()));
            User user = userRepository.findByUsername(username);
            saveGameForUser(game, user);
        } else {
            Game game = gameRepository.save(new Game(gameToAdd.getId(), gameToAdd.getName()));
            User user = userRepository.findByUsername(username);
            saveGameForUser(game, user);
        }
    }

    private void saveGameForUser(Game game, User user) {
        game.getUsers().add(user);
        user.getGames().add(game);
        gameRepository.save(game);
        userRepository.save(user);
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
        myGamesRecords.sort(Collections.reverseOrder());
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
        myScore = userWinsMap.get(username) == null ? 0 : userWinsMap.get(username).size();
        updateTopPlayerWithScore(topPlayerWithScore, userWinsMap);
        latestWinDate = getLatestWinDate(username, userWinsMap);

        return new MyGamesRecord(game.getId(), game.getName(), imagePath, myScore, topPlayerWithScore.getBestScore(),
                topPlayerWithScore.getTopPlayer(), latestWinDate, winRepository.existsByGame_Id(game.getId()));
    }

    private String getImagePath(String ids) {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("ids", ids);
        List<Map<String, Object>> games = bgaService.getGames(parameters);
        return games.get(0).get("image_url").toString();
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
                if (currentPlayerLatestWin.isPresent()
                        && topPlayerLatestWin.isPresent()
                        && currentPlayerLatestWin.get().getDate().compareTo(topPlayerLatestWin.get().getDate()) < 0) {
                    topPlayerWithScore.setTopPlayer(currentPlayerLatestWin.get().getUser().getUsername());
                }
            }
        }
    }

    private LocalDate getLatestWinDate(String username, Map<String, List<Win>> userWinsMap) {
        Optional<Win> latestWin = userWinsMap.get(username) == null ? Optional.empty() : userWinsMap.get(username).stream().min((w1, w2) -> w2.getDate().compareTo(w1.getDate()));
        return latestWin.map(Win::getDate).orElse(null);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    private static class TopPlayerWithScore {
        String topPlayer;
        long bestScore;
    }
}
