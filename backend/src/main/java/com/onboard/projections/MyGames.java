package com.onboard.projections;

import lombok.Data;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@Immutable
@Subselect("select username from user")
public class MyGames {

    @Id
    private String username;
    @OneToMany(mappedBy = "myGames")
    private List<MyGamesRecord> myGamesRecords;
}
