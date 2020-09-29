package com.onboard.projections;

import lombok.Data;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Data
@Entity
@Immutable
@Subselect("select G.id, S.score as my_score, MS.score as best_score, MS.user_id as top_player, S.last_win, U.username\n" +
        "from GAME G\n" +
        "         join USER_GAME UG on G.id = UG.game_id\n" +
        "         join USER U on UG.user_id = U.id\n" +
        "         join (select W.game_id, W.user_id, count(*) score, max(W.date) last_win\n" +
        "               from WIN W\n" +
        "               group by W.game_id, W.user_id) S on S.game_id = G.id and S.user_id = U.id\n" +
        "         join (select *, ROW_NUMBER() over (partition by S.game_id order by S.score DESC) as rn\n" +
        "               from (select W.game_id, W.user_id, count(*) score\n" +
        "                     from WIN W\n" +
        "                     group by W.game_id, W.user_id) S) MS on MS.game_id=G.id where rn=1")
public class MyGamesRecord {

    @Id
    private Long id;
    private Long myScore;
    private Long bestScore;
    private String topPlayer;
    private LocalDate lastWin;

    @ManyToOne
    @JoinColumn(name = "username")
    private MyGames myGames;
}
