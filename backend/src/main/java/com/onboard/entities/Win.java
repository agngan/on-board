package com.onboard.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class Win {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private final LocalDate date;
    // TODO: Add varying scores?
//    private Integer score;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private final User user;
    @ManyToOne
    @JoinColumn(name = "game_id")
    private final Game game;

}
