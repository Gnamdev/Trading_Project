package com.trading.app.Service.implementation;

import com.trading.app.Repository.TwoFectoreOtpRepo;
import com.trading.app.Service.TwoOtpService;
import com.trading.app.model.TwoFectoreOtp;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactoreOtpImpl implements TwoOtpService {

    @Autowired
    private TwoFectoreOtpRepo twoFectoreOtpRepo;

    @Override
    public TwoFectoreOtp createTwoFectoreOtp(User user, String jwt, String otp) {


        String id = UUID.randomUUID().toString();

        TwoFectoreOtp twoFectoreOtp = new TwoFectoreOtp();
        twoFectoreOtp.setId(id);
        twoFectoreOtp.setUser(user);
        twoFectoreOtp.setJwt(jwt);
        twoFectoreOtp.setOtp(otp);
        return twoFectoreOtpRepo.save(twoFectoreOtp);

    }

    @Override
    public TwoFectoreOtp findByUser(Long id) {
        return twoFectoreOtpRepo.findByUserId(id);
    }

    @Override
    public TwoFectoreOtp findById(String id) {
        Optional<TwoFectoreOtp> byId = twoFectoreOtpRepo.findById(id);
       return byId.orElse(null);
    }

    @Override
    public boolean verifyTwoFectoreOtp(TwoFectoreOtp twoFectoreOtp, String otp) {


        return twoFectoreOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFectoreOtp(TwoFectoreOtp tfOtp) {

        twoFectoreOtpRepo.delete(tfOtp);

    }
}
