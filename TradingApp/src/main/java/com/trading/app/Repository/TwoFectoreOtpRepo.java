package com.trading.app.Repository;

import com.trading.app.model.TwoFectoreOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TwoFectoreOtpRepo extends JpaRepository<TwoFectoreOtp, String> {

   TwoFectoreOtp findByUserId(Long userId);


}
