package com.trading.app.Service;

import com.trading.app.model.Coins;
import com.trading.app.model.User;
import com.trading.app.model.WatchList;

public interface WatchListService {

    WatchList findById(Long id) throws Exception;
    WatchList findUserWatchList(Long userId) throws Exception;
    WatchList createWatchList (User user);

    Coins addItemToWatchList(Coins coins, User user) throws Exception;
}
