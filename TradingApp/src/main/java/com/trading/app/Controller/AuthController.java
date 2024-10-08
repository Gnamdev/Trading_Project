package com.trading.app.Controller;

import com.trading.app.Config.JwtProvider;
import com.trading.app.Repository.UserRepository;
import com.trading.app.Response.AuthResponse;
import com.trading.app.Service.WatchListService;
import com.trading.app.Service.implementation.CustomUserDetailsService;
import com.trading.app.Service.implementation.EmailService;
import com.trading.app.Service.TwoOtpService;
import com.trading.app.Utills.OtpUtils;
import com.trading.app.model.TwoFectoreOtp;
import com.trading.app.model.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {
        User byEmail = userRepository.findByEmail(user.getEmail());

        if (byEmail != null) {
            throw new Exception("Email is already used in other accound");
        }


        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setFullName(user.getFullName());

        UsernamePasswordAuthenticationToken authentication  = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);


        String jwt = JwtProvider.generateToken(authentication);

        User saveUser = userRepository.save(newUser);

        watchListService.createWatchList(saveUser);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);

        authResponse.setStatus(true);
        authResponse.setMessage("Successfully registered");



        return new ResponseEntity<>(authResponse , HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {


        Authentication auth = authenticate(user.getEmail() , user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);
        User authUser = userRepository.findByEmail(user.getEmail());

        if(user.getTwoFactoreAuthentication().isEnabled()){

            AuthResponse res = new AuthResponse();
            res.setMessage("Two factore authentication is enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp = OtpUtils.generateOtp();

            TwoFectoreOtp oldTwofactorOtp = twoOtpService.findByUser(user.getId());

            if(oldTwofactorOtp != null){
                twoOtpService.deleteTwoFectoreOtp(oldTwofactorOtp);
            }

            twoOtpService.createTwoFectoreOtp(authUser , jwt , otp);

            emailService.sendVerificationOtpByEmail(authUser.getEmail(),  otp);

            res.setSession(new TwoFectoreOtp().getId());

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Successfully Login");




        return new ResponseEntity<>(authResponse , HttpStatus.CREATED);
    }

    private Authentication authenticate(String email, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Username and password is invalid");

        }
        if (!userDetails.getPassword().equals(password)) {
            throw new BadCredentialsException("Passwords do not match");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());

    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifiedSignInOtp(@PathVariable String otp ,
                                                          @RequestParam String id ) throws Exception {

        TwoFectoreOtp byId = twoOtpService.findById(id);
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
