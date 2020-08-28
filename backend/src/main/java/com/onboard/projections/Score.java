package com.onboard.projections;

import lombok.Data;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Immutable
@Entity
@Data
@Subselect("select U.id, U.username, count(*) points, G.id game_id\n" +
        "from USER U\n" +
        "         join WIN W on U.id = W.user_id\n" +
        "         join GAME G on W.game_id = G.id\n" +
        "group by game_id, user_id\n" +
        "order by points DESC")
class Score {

    @Id
    private Long id;
    private String username;
    private Long points;
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Ranking ranking;
}
