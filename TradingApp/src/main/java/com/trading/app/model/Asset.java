package com.trading.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "coin_id")
    private Long assetId;

    private double quantity;
    private double buyPrice;

    @ManyToOne
    private Coins coin;

    @ManyToOne
    private User user ;
}
