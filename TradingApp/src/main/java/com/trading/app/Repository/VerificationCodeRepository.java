package com.trading.app.Repository;

import com.trading.app.model.VarificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VarificationCode, Long> {

    VarificationCode findByUserId(Long userID);
}
