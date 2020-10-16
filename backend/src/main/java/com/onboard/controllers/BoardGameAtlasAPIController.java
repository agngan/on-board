package com.onboard.controllers;

import com.onboard.entities.Game;
import com.onboard.pojos.GameCategory;
import com.onboard.pojos.GameSummary;
import com.onboard.repositories.GameRepository;
import com.onboard.repositories.UserRepository;
import com.onboard.repositories.WinRepository;
import com.onboard.services.BoardGameAtlasAPICommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Integer.valueOf;

@RestController
@RequestMapping("${spring.data.rest.base-path}/bga")
public class BoardGameAtlasAPIController {

    private final static int limit = 100;
    private final BoardGameAtlasAPICommunicationService bgaService;
    private final GameRepository gameRepository;
    private final WinRepository winRepository;
    private final UserRepository userRepository;

    @Autowired
    public BoardGameAtlasAPIController(BoardGameAtlasAPICommunicationService bgaService, GameRepository gameRepository, WinRepository winRepository, UserRepository userRepository) {
        this.bgaService = bgaService;
        this.gameRepository = gameRepository;
        this.winRepository = winRepository;
        this.userRepository = userRepository;
    }

    @GetMapping({"/searchByDetails", "/searchByDetails/{username}"})
    public ResponseEntity<List<GameSummary>> searchByDetails(@PathVariable Optional<String> username,
                                                             @RequestParam List<Integer> numberOfPlayers,
                                                             @RequestParam List<Integer> playtimeRange,
                                                             @RequestParam Integer minAge,
                                                             @RequestParam List<String> categories) {
        Map<String, String> parameters = getDetailsParametersMap(numberOfPlayers, playtimeRange, minAge, categories);
        List<GameSummary> gameSummaries = getGameSummaries(parameters, username);
        return new ResponseEntity<>(gameSummaries, HttpStatus.OK);
    }

    private Map<String, String> getDetailsParametersMap(List<Integer> numberOfPlayers, List<Integer> playtimeRange, Integer minAge, List<String> categories) {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("limit", String.valueOf(limit));
        parameters.put("lt_min_players", Integer.toString(numberOfPlayers.get(0) + 1));
        parameters.put("gt_max_players", Integer.toString(numberOfPlayers.get(1) - 1));
        parameters.put("gt_min_playtime", Integer.toString(playtimeRange.get(0) - 1));
        parameters.put("lt_max_playtime", Integer.toString(playtimeRange.get(1) + 1));
        parameters.put("lt_min_age", Integer.toString(minAge + 1));
        if (!categories.isEmpty()) {
            parameters.put("categories", String.join(",", categories));
        }
        parameters.put("order_by", "popularity");
        return parameters;
    }

    private List<GameSummary> getGameSummaries(Map<String, String> parameters, Optional<String> username) {
        List<GameSummary> gameSummaries = new ArrayList<>();
        List<Map<String, Object>> gamesMaps = bgaService.getGames(parameters);
        List<String> userGamesByApiId = new ArrayList<>();
        if (username.isPresent() && userRepository.existsByUsername(username.get())) {
            userGamesByApiId = userRepository.findByUsername(username.get()).getGames().stream().map(Game::getApiId).collect(Collectors.toList());
        }

        for (Map<String, Object> gameMap : gamesMaps) {
            addGameSummary(gameSummaries, gameMap, userGamesByApiId);
        }
        return gameSummaries;
    }

    private void addGameSummary(List<GameSummary> gameSummaries, Map<String, Object> gameMap, List<String> userGamesByApiId) {
        Optional<Game> gameOptional = gameRepository.findByApiId(gameMap.get("id").toString());
        String id = gameOptional.map(game -> game.getId().toString()).orElseGet(() -> gameMap.get("id").toString());
        String name = gameMap.get("name") != null ? gameMap.get("name").toString() : "";
        String imagePath = gameMap.get("image_url") != null ? gameMap.get("image_url").toString() : "";
        Integer minPlayers = gameMap.get("min_players") != null ? valueOf(gameMap.get("min_players").toString()) : null;
        Integer maxPlayers = gameMap.get("max_players") != null ? valueOf(gameMap.get("max_players").toString()) : null;
        Integer minPlaytime = gameMap.get("min_playtime") != null ? valueOf(gameMap.get("min_playtime").toString()) : null;
        Integer maxPlaytime = gameMap.get("max_playtime") != null ? valueOf(gameMap.get("max_playtime").toString()) : null;
        Integer minimalAge = gameMap.get("min_age") != null ? valueOf(gameMap.get("min_age").toString()) : null;
        Integer yearPublished = gameMap.get("year_published") != null ? valueOf(gameMap.get("year_published").toString()) : null;
        String primaryPublisher = gameMap.get("primary_publisher") != null ? gameMap.get("primary_publisher").toString() : "";
        String description = gameMap.get("description") != null ? gameMap.get("description").toString() : "";
        boolean hasRanking = gameOptional.isPresent() && winRepository.existsByGame_Id(Long.valueOf(id));
        boolean added = userGamesByApiId.contains(gameMap.get("id").toString());

        gameSummaries.add(new GameSummary(
                id,
                name,
                imagePath,
                new Integer[]{minPlayers, maxPlayers},
                new Integer[]{minPlaytime, maxPlaytime},
                minimalAge,
                yearPublished,
                primaryPublisher,
                description,
                hasRanking,
                added));
    }

    @GetMapping({"/searchByName", "/searchByName/{username}"})
    public ResponseEntity<List<GameSummary>> searchByName(@PathVariable Optional<String> username, @RequestParam String name) {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("name", name);
        parameters.put("fuzzy_match", "true");
        parameters.put("order_by", "popularity");

        List<GameSummary> gameSummaries = getGameSummaries(parameters, username);
        return new ResponseEntity<>(gameSummaries, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<GameCategory>> getCategories() {
        List<GameCategory> categories = new ArrayList<>();
        List<Map<String, Object>> categoriesMap = bgaService.getCategories();

        for (Map<String, Object> categoryMap : categoriesMap) {
            categories.add(new GameCategory(categoryMap.get("id").toString(), categoryMap.get("name").toString()));
        }

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
