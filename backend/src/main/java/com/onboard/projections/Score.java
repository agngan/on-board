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
@Subselect("select U.id, U.username, count(*) points, G.name game_name\n" +
        "from USER U\n" +
        "         join WIN W on U.id = W.user_id\n" +
        "         join GAME G on W.game_id = G.id\n" +
        "group by game_name, user_id\n" +
        "order by points DESC")
class Score {

    @Id
    Long id;
    String username;
    Long points;
    @ManyToOne
    @JoinColumn(name = "game_name")
    private Ranking ranking;
}
