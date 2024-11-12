package com.trading.app.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String jwt ;
    private boolean status;
    private  String message;
    private boolean isTwoFactorAuthEnabled;
    private String session;
    private List<String> errors;



}
