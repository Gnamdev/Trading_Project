package com.trading.app.Service;

import com.trading.app.model.User;
import com.trading.app.model.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(User user , Long amount);

    Withdrawal procedWithdrawal(Long withdrawalId , boolean accepted ) throws Exception;

    List<Withdrawal> getUserWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}
