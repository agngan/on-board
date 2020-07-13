package com.onboard.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String apiId;

    @ManyToMany(mappedBy = "games")
    private List<User> users;

    @OneToMany(mappedBy = "game")
    private List<Win> wins;
}
