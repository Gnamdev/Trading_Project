package com.trading.app.Service;

import com.trading.app.model.PaymentDetails;
import com.trading.app.model.User;

public interface PaymentDetailsService {

    PaymentDetails addPaymentDetails(String accountNumber ,
                                     String account ,
                                     String ifscCode ,
                                     String bankName ,
                                     User user);

    PaymentDetails getUsersPaymentDetails(User user);
}
