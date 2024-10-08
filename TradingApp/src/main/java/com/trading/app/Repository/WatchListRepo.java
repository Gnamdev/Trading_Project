package com.trading.app.Repository;

import com.trading.app.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchListRepo extends JpaRepository<WatchList, Long> {

    WatchList findByUserId(Long id);

}
