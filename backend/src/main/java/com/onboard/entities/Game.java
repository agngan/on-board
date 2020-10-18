package com.onboard.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(unique = true)
    private final String apiId;
    @NotNull
    @Column(unique = true)
    private final String name;

    @ManyToMany(mappedBy = "games")
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    private List<Win> wins = new ArrayList<>();

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", apiId='" + apiId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
