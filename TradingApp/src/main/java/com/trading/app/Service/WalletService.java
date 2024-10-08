package com.trading.app.Service;

import com.trading.app.model.Order;
import com.trading.app.model.User;
import com.trading.app.model.Wallet;

public interface WalletService {


    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long balance);

    Wallet findWalletById(Long id);

    Wallet walletToWalletTransfer(User sender , Wallet receiverWallet , Long amount);

    Wallet payOrderPayment(Order order, User user);
}

