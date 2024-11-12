package com.trading.app.Controller;

import com.trading.app.Config.JwtProvider;
import com.trading.app.Exception.ValidationException;
import com.trading.app.FormData.UserLoginData;
import com.trading.app.FormData.UserRegisterFormData;
import com.trading.app.Repository.UserRepository;
import com.trading.app.Response.AuthResponse;
import com.trading.app.Service.WatchListService;
import com.trading.app.Service.implementation.CustomUserDetailsService;
import com.trading.app.Service.implementation.EmailService;
import com.trading.app.Service.TwoOtpService;
import com.trading.app.Utills.OtpUtils;
import com.trading.app.model.TwoFectoreOtp;
import com.trading.app.model.User;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final WatchListService watchListService;
   private final UserRepository userRepository;
   private final CustomUserDetailsService customUserDetailsService;
   private final TwoOtpService twoOtpService;
   private final EmailService emailService;

   AuthController(UserRepository userRepository , CustomUserDetailsService customUserDetailsService , TwoOtpService twoOtpService ,EmailService emailService,WatchListService watchListService) {
       this.userRepository = userRepository;
       this.customUserDetailsService = customUserDetailsService;
       this.twoOtpService = twoOtpService;
       this.emailService = emailService;
       this.watchListService = watchListService;
   }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRegisterFormData userRegisterFormData, BindingResult result)  {
        User byEmail = userRepository.findByEmail(userRegisterFormData.getEmail());

        // Validate form data
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            throw new ValidationException(errors);
        }

        // Check if email is already used
        if (userRepository.findByEmail(userRegisterFormData.getEmail()) != null) {
            throw new ValidationException(Collections.singletonList("Email is already in use"));
        }

        // Create and set up new User
        User newUser = new User();
        newUser.setEmail(userRegisterFormData.getEmail());
        newUser.setPassword(userRegisterFormData.getPassword());  // Make sure the password is hashed if needed
        newUser.setFullName(userRegisterFormData.getFullName());

        // Authenticate and generate JWT
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(newUser.getEmail(), newUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = JwtProvider.generateToken(authentication);

        // Save user and initialize watch list
        User savedUser = userRepository.save(newUser);
        watchListService.createWatchList(savedUser);

        // Set up response
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Successfully registered");



        return new ResponseEntity<>(authResponse , HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody UserLoginData loginData, BindingResult result) throws Exception {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            throw new ValidationException(errors);
        }

        Authentication auth = authenticate(loginData.getEmail(), loginData.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);
        User authUser = userRepository.findByEmail(loginData.getEmail());

        if (authUser.getTwoFactoreAuthentication().isEnabled()) {
            AuthResponse res = new AuthResponse();
            res.setMessage("Two-factor authentication is enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp = OtpUtils.generateOtp();

            TwoFectoreOtp oldTwofactorOtp = twoOtpService.findByUser(authUser.getId());
            if (oldTwofactorOtp != null) {
                twoOtpService.deleteTwoFectoreOtp(oldTwofactorOtp);
            }

            twoOtpService.createTwoFectoreOtp(authUser, jwt, otp);
            emailService.sendVerificationOtpByEmail(authUser.getEmail(), otp);

            res.setSession(new TwoFectoreOtp().getId());

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Successfully logged in");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String email, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new ValidationException(Collections.singletonList("Username and password is invalid"));

        }
        if (!userDetails.getPassword().equals(password)) {
            throw new ValidationException(Collections.singletonList("Passwords do not match"));
        }
        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());

    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifiedSignInOtp(@PathVariable String otp ,
                                                          @RequestParam String id ) throws Exception {

        TwoFectoreOtp byId = twoOtpService.findById(id);

        log.info("two factor user --->  {}" ,byId);
        if (twoOtpService.verifyTwoFectoreOtp(byId, otp)) {

            AuthResponse authResponse = new AuthResponse();

            authResponse.setJwt(byId.getJwt());
            authResponse.setTwoFactorAuthEnabled(true);
            authResponse.setMessage("Successfully verified");
            return new ResponseEntity<>(authResponse , HttpStatus.OK);
        }
        throw new Exception("invalid otp , please try again later !");
    }

}
