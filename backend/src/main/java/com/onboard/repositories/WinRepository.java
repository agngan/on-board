package com.onboard.repositories;

import com.onboard.entities.Win;
import org.springframework.data.repository.CrudRepository;

public interface WinRepository extends CrudRepository<Win, Long> {

    boolean existsByGame_Id(Long game_id);
}
