package com.onboard.repositories;

import com.onboard.entities.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface GameRepository extends CrudRepository<Game, Long> {

    boolean existsById(Long id);

    Game getById(Long id);

    Optional<Game> findByApiId(String apiId);
}
