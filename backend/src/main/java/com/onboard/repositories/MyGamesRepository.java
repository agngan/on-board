package com.onboard.repositories;

import com.onboard.projections.MyGames;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "myGames", path = "myGames")
public interface MyGamesRepository extends CrudRepository<MyGames, String> {
}
