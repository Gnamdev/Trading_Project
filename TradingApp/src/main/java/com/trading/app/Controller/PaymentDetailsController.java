package com.trading.app.Controller;

import com.trading.app.Service.PaymentDetailsService;
import com.trading.app.Service.UserService;
import com.trading.app.model.PaymentDetails;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentDetailsController {

    @Autowired
    private PaymentDetailsService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/payment-details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetails paymentDetails ,
                                                             @RequestHeader("Authorization") String jwt) throws  Exception {
        User user = userService.findUserProfileByJwt(jwt);

        PaymentDetails paymentDetails1 = paymentService.addPaymentDetails(
                paymentDetails.getBankAccountNumber(),
                paymentDetails.getAccountHolderName(),
                paymentDetails.getIfscCode(),
                paymentDetails.getBankName(),
                user
        );

        return  new ResponseEntity<>(paymentDetails1 , HttpStatus.CREATED);

    }

    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getPaymentDetails(@RequestHeader("Authorization") String jwt) throws  Exception {
        User user = userService.findUserProfileByJwt(jwt);
        PaymentDetails usersPaumentDetails = paymentService.getUsersPaymentDetails(user);

        return new ResponseEntity<>(usersPaumentDetails , HttpStatus.OK);

    }




}
