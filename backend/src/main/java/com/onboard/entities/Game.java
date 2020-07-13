package com.onboard.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String apiId;

    @OneToMany(mappedBy = "game")
    private List<Score> scores;

    @ManyToMany(mappedBy = "games")
    private List<User> users;
}
