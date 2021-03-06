package com.onboard.pojos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MyGamesRecord implements Comparable<MyGamesRecord>{

    private final Long gameId;
    private final String gameName;
    private final String imagePath;
    private final Long myScore;
    private final Long bestScore;
    private final String topPlayer;
    private final LocalDate lastWin;
    private final boolean hasRanking;

    @Override
    public int compareTo(MyGamesRecord o) {
        return this.getMyScore().compareTo(o.getMyScore());
    }
}
