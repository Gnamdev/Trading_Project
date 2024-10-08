package com.trading.app.Service;

import com.trading.app.model.TwoFectoreOtp;
import com.trading.app.model.User;

public interface TwoOtpService {

    TwoFectoreOtp createTwoFectoreOtp(User user , String jwt , String otp);
    TwoFectoreOtp findByUser(Long id);
    TwoFectoreOtp findById(String id);

    boolean verifyTwoFectoreOtp(TwoFectoreOtp tfOtp ,String otp);

    void deleteTwoFectoreOtp(TwoFectoreOtp tfOtp);
}
