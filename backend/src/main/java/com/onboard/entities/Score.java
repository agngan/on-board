package com.onboard.entities;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.io.Serializable;

@Entity
@Data
public class Score {

    @EmbeddedId
    private ScoreId id;
    private Integer score;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Game game;

    @Embeddable
    @Data
    private class ScoreId implements Serializable {
//        @ManyToOne
//        @JoinColumn(name = "user_id")
//        private User user;
        @Column(name = "user_id")
        private Integer userId;
//        @ManyToOne
//        @JoinColumn(name = "game_id")
//        private Game game;
        @Column(name = "game_id")
        private Integer gameId;

    }
}
