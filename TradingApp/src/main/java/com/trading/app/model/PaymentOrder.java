package com.trading.app.model;

import com.trading.app.domain.PaymentMethod;
import com.trading.app.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;
    private PaymentOrderStatus status;

    private PaymentMethod paymentMethod;
    @ManyToOne
    private User user;


}
