package com.onboard.controllers;

import com.onboard.pojos.GameSummary;
import com.onboard.services.BoardGameAtlasAPICommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Integer.valueOf;

@RestController
@RequestMapping("${spring.data.rest.base-path}/bga")
public class BoardGameAtlasAPIController {

    private final static int limit = 100;
    private final BoardGameAtlasAPICommunicationService bgaService;

    @Autowired
    public BoardGameAtlasAPIController(BoardGameAtlasAPICommunicationService bgaService) {
        this.bgaService = bgaService;
    }

    @GetMapping("/searchByDetails")
    public ResponseEntity<List<GameSummary>> searchByDetails(@RequestParam List<Integer> numberOfPlayers,
                                                             @RequestParam List<Integer> playtimeRange,
                                                             @RequestParam Integer minAge,
                                                             @RequestParam String category) {
        System.out.println("Number of players: " + numberOfPlayers);
        System.out.println("Playtime range: " + playtimeRange);
        System.out.println("Min age: " + minAge);
        System.out.println("Category: " + category);

        Map<String, String> parameters = new HashMap<>();
        parameters.put("limit", String.valueOf(limit));
        parameters.put("lt_min_players", Integer.toString(numberOfPlayers.get(0) + 1));
        parameters.put("gt_max_players", Integer.toString(numberOfPlayers.get(1) - 1));
        parameters.put("gt_min_playtime", Integer.toString(playtimeRange.get(0) - 1));
        parameters.put("lt_max_playtime", Integer.toString(playtimeRange.get(1) + 1));
        parameters.put("lt_min_age", Integer.toString(minAge + 1));
        if (!category.equals(""))
            parameters.put("categories", category);

        List<Map<String, Object>> gamesMaps = bgaService.getGames(parameters);
        List<GameSummary> gameSummaries = new ArrayList<>();

        for (Map<String, Object> gameMap : gamesMaps) {
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

            gameSummaries.add(new GameSummary(name,
                    imagePath,
                    new Integer[]{minPlayers, maxPlayers},
                    new Integer[]{minPlaytime, maxPlaytime},
                    minimalAge,
                    yearPublished,
                    primaryPublisher,
                    description));
        }

        System.out.println(gameSummaries.size());
        return new ResponseEntity<>(gameSummaries, HttpStatus.OK);
    }
}
