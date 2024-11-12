package com.trading.app.model;

import com.trading.app.domain.OrderStatus;
import com.trading.app.domain.Order_Type;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Data
@Table(name ="customer_order" )
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private Order_Type order_type;

    private BigDecimal price;

    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(nullable = false)
    private OrderStatus orderstatus;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private OrderItem orderitem;


}
