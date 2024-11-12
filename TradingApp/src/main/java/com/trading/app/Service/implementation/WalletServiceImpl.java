package com.trading.app.Service.implementation;

import com.trading.app.Repository.WalletRepository;
import com.trading.app.Service.WalletService;
import com.trading.app.domain.Order_Type;
import com.trading.app.model.Order;
import com.trading.app.model.User;
import com.trading.app.model.Wallet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Slf4j
public class WalletServiceImpl implements WalletService {


    @Autowired
    private WalletRepository walletRepository;


    @Override
    public Wallet getUserWallet(User user) {

        Wallet byUserId = walletRepository.findByUserId(user.getId());

        if (byUserId == null) {
            Wallet wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO);
            walletRepository.save(wallet);
            System.out.println("user wallet service " + wallet);

        }
        return byUserId;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {

        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);

        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findWalletById(Long id) {

        Optional<Wallet> walletByid = walletRepository.findById(id);
        if (walletByid.isPresent()) {
            return walletByid.get();
        }

        throw new RuntimeException("Wallet not found");
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) {

        Wallet senderWallet = getUserWallet(sender);
        log.info(" before Sender wallet balance : " + senderWallet.getBalance() + "amount -> " + amount);

        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {

            throw new RuntimeException("Insufficient funds");
        }
        BigDecimal subtractBalance = senderWallet.getBalance().
                subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(subtractBalance);
        log.info(" before sender wallet balance : " + senderWallet.getBalance());
        walletRepository.save(senderWallet);


        //add into receiver wallet
        log.info(" before receiver wallet balance : " + receiverWallet.getBalance());
        BigDecimal receiveBalance = receiverWallet.getBalance().add(BigDecimal.valueOf(amount));


        receiverWallet.setBalance(receiveBalance);

        walletRepository.save(receiverWallet);
        log.info(" After receiver wallet balance : " + receiverWallet.getBalance());

        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user ) {

        Wallet userWallet = getUserWallet(user);

        if (order.getOrder_type().equals(Order_Type.BUY)) {
            BigDecimal newBalance = userWallet.getBalance().subtract(order.getPrice());
            if (newBalance.compareTo(order.getPrice()) <0){
                throw new RuntimeException("Insufficient funds");
            }
            userWallet.setBalance(newBalance);
        }else {
            BigDecimal newBalance = userWallet.getBalance().add(order.getPrice());
            userWallet.setBalance(newBalance);
        }

        walletRepository.save(userWallet);



        return userWallet;
    }
}
