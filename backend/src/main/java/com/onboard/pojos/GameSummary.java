package com.onboard.pojos;

import lombok.Data;

@Data
public class GameSummary {

    private final String name;
    private final String imagePath;
    private final Integer[] numberOfPlayers;
    private final Integer[] playtimeRange;
    private final Integer minAge;
    private final Integer yearPublished;
    private final String primaryPublisher;
    private final String description;
}
