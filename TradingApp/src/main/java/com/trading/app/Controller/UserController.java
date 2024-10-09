package com.trading.app.Controller;

import com.trading.app.Response.ApiResponse;
import com.trading.app.Response.AuthResponse;
import com.trading.app.Request.ForgetPasswordRequest;
import com.trading.app.Request.ResetPasswordRequest;
import com.trading.app.Service.implementation.EmailService;
import com.trading.app.Service.ForgetPasswordService;
import com.trading.app.Service.UserService;
import com.trading.app.Service.VerificationCodeService;
import com.trading.app.Utills.OtpUtils;
import com.trading.app.domain.VerificationType;
import com.trading.app.model.ForgetPasswordToken;
import com.trading.app.model.User;
import com.trading.app.model.VarificationCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {


    private final UserService userService;
    private final  EmailService emailService;
    private final ForgetPasswordService forgetPasswordService;
    private final VerificationCodeService verificationCodeService;
    public UserController(UserService userService, EmailService emailService , VerificationCodeService verificationCodeService , ForgetPasswordService forgetPasswordService) {
        this.userService = userService;
        this.emailService = emailService;
        this.verificationCodeService = verificationCodeService;
        this.forgetPasswordService = forgetPasswordService;
    }

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User userProfileByJwt = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(userProfileByJwt , HttpStatus.OK);
    }

    @PostMapping ("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@RequestHeader("Authorization") String jwt ,
                                                    @PathVariable VerificationType verificationType) throws Exception {
        User userProfileByJwt = userService.findUserProfileByJwt(jwt);

        VarificationCode verificationCodeByUser = verificationCodeService.getVerificationCodeByUser(userProfileByJwt.getId());

        if (verificationCodeByUser == null) {

            verificationCodeByUser= verificationCodeService.sendVerificationCode( verificationType , userProfileByJwt);

        }
        if (verificationType.equals(VerificationType.EMAIL)){
            emailService.sendVerificationOtpByEmail(userProfileByJwt.getEmail() , verificationCodeByUser.getOtp());

        }
        return new ResponseEntity<>("verification OTP  sent  successfully" , HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication( @PathVariable String otp, @RequestHeader("Authorization") String jwt ) throws Exception {
        User userProfileByJwt = userService.findUserProfileByJwt(jwt);

        VarificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(userProfileByJwt.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail() :verificationCode.getMobileNumber();

        Boolean  isVerified = verificationCode.getOtp().equals(otp);

        if (isVerified){
            userService.enableTwoFactorAuthentication(verificationCode.getVerificationType() , sendTo , userProfileByJwt);

            verificationCodeService.deleteVerificationCodeByID(verificationCode);
           return new ResponseEntity<>(userProfileByJwt , HttpStatus.OK);
        }


     throw new Exception("wrong otp");
      }


    @PostMapping ("/api/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgetPasswordOtp( @RequestBody ForgetPasswordRequest request) throws Exception {
        User user = userService.findUserProfileByEmail(request.getSendTo());
        String otp = OtpUtils.generateOtp();

        String id = UUID.randomUUID().toString();


        ForgetPasswordToken token = forgetPasswordService.findByUser(user.getId());

        if (token == null) {
            forgetPasswordService.createToken(user , id , otp , request.getVerificationType() , request.getSendTo());
        }

        if (request.getVerificationType().equals(VerificationType.EMAIL)){

            assert token != null;
            emailService.sendVerificationOtpByEmail(user.getEmail() , token.getOtp());

        }

        AuthResponse   authResponse = new AuthResponse();

        authResponse.setMessage("Rest password otp send successfully ");
        authResponse.setSession(token.getId());
        return new ResponseEntity<>(authResponse , HttpStatus.OK);
    }

    @PatchMapping("/api/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody ResetPasswordRequest req, @RequestParam String id, @RequestHeader("Authorization") String jwt ) throws Exception {

        ForgetPasswordToken forgetPasswordToken = forgetPasswordService.findById(id);

        boolean isVerified = forgetPasswordToken.getOtp().equals(req.getOtp());

        if (isVerified) {
            userService.updatePassword(forgetPasswordToken.getUser(), req.getPassword());
            ApiResponse apiResponse = new ApiResponse();

            apiResponse.setMessage("Rest password reset successfully ");

            return new ResponseEntity<>(apiResponse, HttpStatus.ACCEPTED);
        }

        throw new Exception("wrong otp");

    }



}
