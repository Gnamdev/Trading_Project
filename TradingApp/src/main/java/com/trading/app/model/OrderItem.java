package com.trading.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long order_item_id;

    private double quantity;

    @ManyToOne
    private Coins coins;

    private double buyPrice;

    private  double sellPrice;


    @JsonIgnore
    @OneToOne
    private Order order;
}
