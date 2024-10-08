package com.trading.app.Controller;

import com.trading.app.Response.PaymentResponse;
import com.trading.app.Service.OrderService;
import com.trading.app.Service.PaymentService;
import com.trading.app.Service.UserService;
import com.trading.app.Service.WalletService;
import com.trading.app.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;


    @Autowired
    private PaymentService paymentService;


    @GetMapping("/api/wallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        if (user == null) {
            System.out.println("User not found for the provided JWT.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve user wallet
        Wallet userWallet = walletService.getUserWallet(user);

        // Debugging output for better traceability
//        if (userWallet == null) {
//            System.out.println("No wallet found for user: " + user.getId());
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if no wallet exists
//        } else {
//            System.out.println("Retrieved wallet: " + userWallet);
//        }

        // Return the wallet with an OK status
        return new ResponseEntity<>(userWallet, HttpStatus.OK);


    }

    @PutMapping("/api/wallet/{walletId}/transfer")
    public  ResponseEntity<Wallet> walletToWalletTransfer(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long walletId,
            @RequestBody WalletTransaction req) throws Exception {
        User senderUser = userService.findUserProfileByJwt(jwt);

        Wallet receiverUser = walletService.findWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransfer(senderUser, receiverUser, req.getAmount());

        return new ResponseEntity<>(wallet , HttpStatus.ACCEPTED);
    }


    @PutMapping("/api/wallet/order/{orderId}/pay")
    public  ResponseEntity<Wallet> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

       Order order = orderService.getOrderById(orderId);

        Wallet wallet = walletService.payOrderPayment(order, user);

        return new ResponseEntity<>(wallet , HttpStatus.ACCEPTED);
    }



    @PutMapping("/api/wallet/deposit")
    public  ResponseEntity<Wallet> addMoneyToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name="order_id") Long orderId,
            @RequestParam(name = "payment_id") String paymentId
            ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);


        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder order = paymentService.getPaymentOrderById(orderId);

        Boolean status = paymentService.processPaymentOrder(order, paymentId);

        if (wallet.getBalance() == null){
            wallet.setBalance(BigDecimal.ZERO);
        }

        if (status){

            walletService.addBalance(wallet ,order.getAmount());
        }


        return new ResponseEntity<>(wallet , HttpStatus.ACCEPTED);
    }
}
