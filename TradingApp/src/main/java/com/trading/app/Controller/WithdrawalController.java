package com.trading.app.Controller;

import com.trading.app.Service.UserService;
import com.trading.app.Service.WalletService;
import com.trading.app.Service.WithdrawalService;
import com.trading.app.model.User;
import com.trading.app.model.Wallet;
import com.trading.app.model.Withdrawal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WithdrawalController {

  @Autowired
    private WithdrawalService withdrawalService;
  @Autowired
     private WalletService walletService;
  @Autowired
    private UserService userService;
//  @Autowired
//     private WalletTransactionService walletTransactionService;


    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @RequestHeader("Authorization") String jwt ,
            @PathVariable Long amount
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet userWallet = walletService.getUserWallet(user);

        Withdrawal withdrawal = withdrawalService.requestWithdrawal(user, amount);

        walletService.addBalance(userWallet, -withdrawal.getAmount());




        return  new ResponseEntity<>(withdrawal , HttpStatus.OK);
    }


    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawalRequest(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Withdrawal withdrawal = withdrawalService.procedWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);
        if (!accept){
            walletService.addBalance(userWallet, withdrawal.getAmount());
        }

        return new ResponseEntity<>(withdrawal , HttpStatus.OK);
    }


    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawal(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        List<Withdrawal> userWithdrawalHistory = withdrawalService.getUserWithdrawalHistory(user);
        return new ResponseEntity<>(userWithdrawalHistory , HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAdminWithdrawal(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Withdrawal> allWithdrawalRequest = withdrawalService.getAllWithdrawalRequest();
        return new ResponseEntity<>(allWithdrawalRequest , HttpStatus.OK);
    }

}
