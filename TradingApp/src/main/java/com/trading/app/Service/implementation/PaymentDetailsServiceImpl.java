package com.trading.app.Service.implementation;

import com.trading.app.Repository.PaymentDetailRepo;

import com.trading.app.Service.PaymentDetailsService;
import com.trading.app.model.PaymentDetails;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    @Autowired
    private PaymentDetailRepo paymentRepo;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String account, String ifscCode, String bankName, User user) {

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setBankName(bankName);
        paymentDetails.setIfscCode(ifscCode);
        paymentDetails.setAccountHolderName(account);
        paymentDetails.setUser(user);
        paymentDetails.setBankAccountNumber(accountNumber);

        return  paymentRepo.save(paymentDetails);

    }

    @Override
    public PaymentDetails getUsersPaymentDetails(User user) {
        return paymentRepo.findByUserId(user.getId());
    }
}
