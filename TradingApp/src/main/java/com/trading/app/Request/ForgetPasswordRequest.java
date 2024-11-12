package com.trading.app.Request;

import com.trading.app.domain.VerificationType;
import lombok.Data;

@Data
public class ForgetPasswordRequest {
    private String sendTo;
    private VerificationType verificationType;

}
