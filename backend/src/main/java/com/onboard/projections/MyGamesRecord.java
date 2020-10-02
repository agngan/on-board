package com.onboard.projections;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MyGamesRecord {

    private final Long gameId;
    private final String gameName;
    private final String imagePath;
    private final Long myScore;
    private final Long bestScore;
    private final String topPlayer;
    private final LocalDate lastWin;
}
