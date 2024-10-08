package com.trading.app.Repository;

import com.trading.app.model.Coins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinsReposistory extends JpaRepository<Coins, String
        > {
}
