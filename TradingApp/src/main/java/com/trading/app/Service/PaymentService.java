package com.trading.app.Service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.trading.app.Response.PaymentResponse;
import com.trading.app.domain.PaymentMethod;
import com.trading.app.model.PaymentOrder;
import com.trading.app.model.User;

public interface PaymentService {

    PaymentOrder createPaymentOrder(User user, Long amount , PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id);
    Boolean processPaymentOrder(PaymentOrder  paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPayment(User  user , Long amount , Long orderId) throws RazorpayException;
    PaymentResponse createStripePayment(User  user , Long amount , Long orderId) throws StripeException;
}
