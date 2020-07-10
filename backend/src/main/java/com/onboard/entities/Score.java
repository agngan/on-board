package com.onboard.entities;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class Score {

    @EmbeddedId
    private ScoreId id;
    private Integer score;

    @Embeddable
    private class ScoreId implements Serializable {
        private Integer gameId;
        private Integer userId;
    }
}
