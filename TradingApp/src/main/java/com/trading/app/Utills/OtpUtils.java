package com.trading.app.Utills;

import lombok.Data;

import java.util.Random;

@Data
public class OtpUtils {
    public  static String generateOtp(){

        int otpLength = 6;
        Random rand = new Random();

        StringBuffer otp = new StringBuffer(otpLength);

        for (int i = 0; i < otpLength; i++){
            otp.append(rand.nextInt(10));
        }

        return otp.toString();

    }
}
