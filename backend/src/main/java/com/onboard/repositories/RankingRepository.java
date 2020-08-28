package com.onboard.repositories;

import com.onboard.projections.Ranking;
import org.springframework.data.repository.CrudRepository;

public interface RankingRepository extends CrudRepository<Ranking, String> {
}
