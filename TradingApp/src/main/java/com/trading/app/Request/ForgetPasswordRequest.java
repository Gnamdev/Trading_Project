package com.trading.app.Response;

import com.trading.app.domain.VerificationType;
import lombok.Data;

@Data
public class ForgetPasswordRequest {
    private String sendTo;
    private VerificationType verificationType;

}
