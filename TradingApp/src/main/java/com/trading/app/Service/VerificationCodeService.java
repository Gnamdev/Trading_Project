package com.trading.app.Service;

import com.trading.app.domain.VerificationType;
import com.trading.app.model.User;
import com.trading.app.model.VarificationCode;

public interface VerificationCodeService {

    VarificationCode sendVerificationCode(VerificationType verificationType , User User);
    VarificationCode getVerificationCodeByID(Long id);
    VarificationCode getVerificationCodeByUser(Long id);

    void deleteVerificationCodeByID(VarificationCode varificationCode);
}
