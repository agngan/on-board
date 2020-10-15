package com.onboard.pojos;

import lombok.Data;

import java.util.List;

@Data
public class WinInfo {

    private Long gameId;
    private List<WinValidationData> validations;
}
