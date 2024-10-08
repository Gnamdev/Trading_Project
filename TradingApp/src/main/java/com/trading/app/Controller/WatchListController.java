package com.trading.app.Controller;

import com.trading.app.Service.CoinsServices;
import com.trading.app.Service.UserService;
import com.trading.app.Service.WatchListService;
import com.trading.app.model.Coins;
import com.trading.app.model.User;
import com.trading.app.model.WatchList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private UserService userService;

    @Autowired
    private  WatchListService watchListService;

    @Autowired
    private CoinsServices coinsServices;


    @GetMapping("/user")
    public ResponseEntity<WatchList> getWatchList( @RequestHeader("Authorization") String jwt ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        WatchList userWatchList = watchListService.findUserWatchList(user.getId());
        return ResponseEntity.ok(userWatchList);


    }


    @GetMapping("/{watchlistId}")
    public ResponseEntity<WatchList> getWatchList( @PathVariable("watchlistId") Long watchlistId ) throws Exception {
        WatchList byId = watchListService.findById(watchlistId);
        return ResponseEntity.ok(byId);

    }
     @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coins> addItemIntoWatchlist( @PathVariable("coinId") String coinId ,
                                                       @RequestHeader("Authorization") String jwt )
             throws Exception {

         User user = userService.findUserProfileByJwt(jwt);
         Coins coins = coinsServices.findById(coinId);
         Coins added = watchListService.addItemToWatchList(coins, user);



         return ResponseEntity.ok(added);

    }




}
