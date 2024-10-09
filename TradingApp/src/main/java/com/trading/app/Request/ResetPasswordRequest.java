package com.trading.app.Response;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String otp;
    private String password;
}
