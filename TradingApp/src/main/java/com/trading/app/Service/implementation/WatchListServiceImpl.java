package com.trading.app.Service.implementation;

import com.trading.app.Repository.WatchListRepo;
import com.trading.app.Service.WatchListService;
import com.trading.app.model.Coins;
import com.trading.app.model.User;
import com.trading.app.model.WatchList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepo watchListRepo;


    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> watchList = watchListRepo.findById(id);

        if (watchList.isEmpty()){
            throw new Exception("watchList not Found");
        }
        return watchList.get();

    }

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList watchList = watchListRepo.findByUserId(userId);

        if (watchList == null) {
            throw new Exception("watch list not found ");
        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {

        WatchList watchList = new WatchList();
        watchList.setUser(user);
        return watchListRepo.save(watchList);
    }

    @Override
    public Coins addItemToWatchList(Coins coins, User user) throws Exception {
        WatchList userWatchList = findUserWatchList(user.getId());

        if (userWatchList.getCoinsList().contains(coins)) {
            userWatchList.getCoinsList().remove(coins);
        }
        else userWatchList.getCoinsList().add(coins);

        WatchList save = watchListRepo.save(userWatchList);

        return coins;


    }
}
