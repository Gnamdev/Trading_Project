package com.trading.app;

import com.trading.app.Service.implementation.EmailService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailTesting {
    @Autowired
    private EmailService emailService;

    @Test
    @Disabled
    void testing() throws MessagingException {
        emailService.sendVerificationOtpByEmail("goutamnamdev8120@gmail.com" , "123456");
    }
}
