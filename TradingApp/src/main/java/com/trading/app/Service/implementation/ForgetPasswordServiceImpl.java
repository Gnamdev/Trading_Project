package com.trading.app.Service.implementation;

import com.trading.app.Repository.ForgetPasswordRepo;
import com.trading.app.Service.ForgetPasswordService;
import com.trading.app.domain.VerificationType;
import com.trading.app.model.ForgetPasswordToken;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ForgetPasswordServiceImpl implements ForgetPasswordService {

    @Autowired
   private ForgetPasswordRepo forgetPasswordRepo;

    @Override
    public ForgetPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
        ForgetPasswordToken forgetPasswordToken = new ForgetPasswordToken();
        forgetPasswordToken.setUser(user);
        forgetPasswordToken.setSendTo(sendTo);
        forgetPasswordToken.setVerificationType(verificationType);
        forgetPasswordToken.setOtp(otp);
        forgetPasswordToken.setId(id);

         return forgetPasswordRepo.save(forgetPasswordToken);

    }

    @Override
    public ForgetPasswordToken findById(String id) {

        Optional<ForgetPasswordToken> byId = forgetPasswordRepo.findById(id);
        return byId.orElse(null);
    }

    @Override
    public ForgetPasswordToken findByUser(Long id) {
        return forgetPasswordRepo.findByUserId(id);
    }

    @Override
    public void deleteToken(ForgetPasswordToken token) {

        forgetPasswordRepo.delete(token);
    }
}
