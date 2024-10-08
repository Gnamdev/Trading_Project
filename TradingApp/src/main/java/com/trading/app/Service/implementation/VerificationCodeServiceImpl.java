package com.trading.app.Service.implementation;

import com.trading.app.Repository.VerificationCodeRepository;
import com.trading.app.Service.VerificationCodeService;
import com.trading.app.Utills.OtpUtils;
import com.trading.app.domain.VerificationType;
import com.trading.app.model.User;
import com.trading.app.model.VarificationCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

    @Autowired
    VerificationCodeRepository verificationCodeRepository;



    @Override
    public VarificationCode sendVerificationCode(VerificationType verificationType, User User) {
        VarificationCode varificationCode = new VarificationCode();

        varificationCode.setOtp(OtpUtils.generateOtp());
        varificationCode.setVerificationType(verificationType);

        varificationCode.setUser(User);
        return verificationCodeRepository.save(varificationCode);
    }

    @Override
    public VarificationCode getVerificationCodeByID(Long id) {
        Optional<VarificationCode> varificationCode = verificationCodeRepository.findById(id);

        if (varificationCode.isPresent()) {
            return varificationCode.get();
        }

        throw new RuntimeException("No verification code found with id " + id);
    }

    @Override
    public VarificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCodeByID(VarificationCode varificationCode) {
          verificationCodeRepository.delete(varificationCode);
    }
}
