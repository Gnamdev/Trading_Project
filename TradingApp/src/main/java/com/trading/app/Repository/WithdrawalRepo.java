package com.trading.app.Repository;

import com.trading.app.model.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WithdrawalRepo extends JpaRepository<Withdrawal, Long> {

    List<Withdrawal> findByUserId(Long userId);
}