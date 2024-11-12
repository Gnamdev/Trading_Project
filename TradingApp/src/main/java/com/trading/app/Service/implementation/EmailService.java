package com.trading.app.Service.implementation;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


    public void sendVerificationOtpByEmail(String email , String otp) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        String subject = "Verification OTP";
        String text = "Your Verification OTP is : " + otp;

            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setTo(email);

            try {
                mailSender.send(mimeMessage);
            }catch (MailException e) {
                throw new MailSendException(e.getMessage());
            }




    }
}
