package com.trading.app.Service;

import com.trading.app.domain.VerificationType;
import com.trading.app.model.ForgetPasswordToken;
import com.trading.app.model.User;

public interface ForgetPasswordService {

    ForgetPasswordToken createToken(User user, String id , String otp , VerificationType verificationType , String sendTo);

    ForgetPasswordToken findById(String id);
    ForgetPasswordToken findByUser(Long id);

    void deleteToken(ForgetPasswordToken token);
}

