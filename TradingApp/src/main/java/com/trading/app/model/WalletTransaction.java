package com.trading.app.model;

import com.trading.app.domain.WalletTransactionType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class WalletTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private Wallet wallet;
    private WalletTransactionType transaction;
    private LocalDate date;
    private String transferId;
    private String purpose;
    private Long amount;
}
