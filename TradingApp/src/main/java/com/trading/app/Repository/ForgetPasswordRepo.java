package com.trading.app.Repository;

import com.trading.app.model.ForgetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgetPasswordRepo extends JpaRepository<ForgetPasswordToken , String> {

    ForgetPasswordToken findByUserId(Long userId);

}
