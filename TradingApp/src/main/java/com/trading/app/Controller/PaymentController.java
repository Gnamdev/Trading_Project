package com.trading.app.Controller;

import com.trading.app.Response.PaymentResponse;
import com.trading.app.Service.PaymentService;
import com.trading.app.Service.UserService;
import com.trading.app.domain.PaymentMethod;
import com.trading.app.model.PaymentOrder;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService  paymentService;
    @Autowired
    private UserService userService;


    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwtToken
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwtToken);

        PaymentResponse paymentResponse;

        PaymentOrder order = paymentService.createPaymentOrder(user, amount, paymentMethod);



        if (paymentMethod.equals(PaymentMethod.RAZORPAY)){
            paymentResponse = paymentService.createRazerpayPaymenting(user , amount , order.getId());
        }else {
            paymentResponse = paymentService.createStripePaymenting(user , amount , order.getId());
        }

        return new ResponseEntity<>(paymentResponse , HttpStatus.CREATED);

    }


}
