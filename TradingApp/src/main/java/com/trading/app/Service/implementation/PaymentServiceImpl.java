package com.trading.app.Service.implementation;


import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.trading.app.Repository.PaymentOrderRepository;
import com.trading.app.Response.PaymentResponse;
import com.trading.app.Service.PaymentService;
import com.trading.app.domain.PaymentMethod;
import com.trading.app.domain.PaymentOrderStatus;
import com.trading.app.model.PaymentOrder;
import com.trading.app.model.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;



    @Override
    public PaymentOrder createPaymentOrder(User user, Long amount, PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        paymentOrder.setUser(user);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) {
        return paymentOrderRepository.findById(id).orElseThrow(() -> new RuntimeException("payment order not found"));
    }

    @Override
    public Boolean processPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {

        if (paymentOrder.getStatus() == null) {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING))
        {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)){

                RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey , razorpayApiSecret);

                Payment payment = razorpayClient.payments.fetch(paymentId);

                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if (status.equals("captured")){
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCEEDED);
                    return true;
                }

                paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;


            }

            paymentOrder.setStatus(PaymentOrderStatus.SUCCEEDED);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }

        return false;
    }

    @Override
    public PaymentResponse createRazorpayPayment(User user, Long amount , Long order) throws RazorpayException {

        Long Amount = amount*100;

        try {

            RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey , razorpayApiSecret);

            //create a JOSON object with the payment link request parameter

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", Amount);
            paymentLinkRequest.put("currency", "INR");


            //create a json object with the customer details
            JSONObject customer = new JSONObject();
            customer.put("name" , user.getFullName());
            customer.put("email" , user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            notify.put("notify"  , notify);

            //set the reminder setting
            paymentLinkRequest.put("reminder_enable" , true);

            //set the callback URL and method after successfully redirect this url
            paymentLinkRequest.put("callback_url" , "http://localhost:5173/wallet?order_id="+order);
            paymentLinkRequest.put("callback_method" , "get");


            PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkUrl = paymentLink.get("short_url");

            PaymentResponse paymentResponse = new PaymentResponse();
            paymentResponse.setPaymentUrl(paymentLinkUrl);

            return paymentResponse;
        }catch (RazorpayException e){

            System.out.println("Error creating payment link" + e.getMessage());
            throw new RazorpayException(e.getMessage());

        }

    }

    @Override
    public PaymentResponse createStripePayment(User user, Long amount, Long orderId) throws StripeException {

        Stripe.apiKey = stripeSecretKey;


        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id=" + orderId)
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()

                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up wallet")
                                        .build()

                                ).build()
                        ).build()

                ).build();

        Session session = Session.create(params);


        System.out.println("session --->" + session);

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentUrl(session.getUrl());
        return paymentResponse;
    }
}
