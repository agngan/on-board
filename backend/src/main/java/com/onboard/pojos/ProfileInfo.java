package com.onboard.pojos;

import lombok.Data;

@Data
public class ProfileInfo {

    private final Long totalWins;
    private final String gameWithHighestScore;
    private final String secretWord;
}
