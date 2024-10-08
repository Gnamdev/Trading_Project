package com.trading.app.Service.implementation;

import com.trading.app.Repository.WithdrawalRepo;
import com.trading.app.Service.WithdrawalService;
import com.trading.app.domain.WithdrawalStatus;
import com.trading.app.model.User;
import com.trading.app.model.Withdrawal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WidrawalServiceImpl implements WithdrawalService {


    @Autowired
    private WithdrawalRepo withdrawalRepo;


    @Override
    public Withdrawal requestWithdrawal(User user, Long amount) {

        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setUser(user);
        withdrawal.setAmount(amount);
       withdrawal.setStatus(WithdrawalStatus.PENDING);


        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal procedWithdrawal(Long withdrawalId, boolean accepted) throws Exception {

        Optional<Withdrawal> withdrawal = withdrawalRepo.findById(withdrawalId);
        if (withdrawal.isEmpty()){
            throw new Exception("withdrawal not found");
        }

        Withdrawal withdrawal1 = withdrawal.get();

        withdrawal1.setDate(LocalDateTime.now());

        if (accepted){
            withdrawal1.setStatus(WithdrawalStatus.SUCCESS);
        }else {
            withdrawal1.setStatus(WithdrawalStatus.DECLINED);
        }
        return withdrawalRepo.save(withdrawal1);
    }

    @Override
    public List<Withdrawal> getUserWithdrawalHistory(User user) {
        return withdrawalRepo.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepo.findAll();
    }
}
