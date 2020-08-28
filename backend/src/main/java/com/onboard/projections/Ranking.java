package com.onboard.projections;

import lombok.Data;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Immutable
@Entity
@Data
@Subselect("select id game_id from game")
public class Ranking {

    @Id
    private Long gameId;
    @OneToMany(mappedBy = "ranking")
    private List<Score> scores;
}
