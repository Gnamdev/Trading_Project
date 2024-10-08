package com.trading.app.Service;

import com.trading.app.model.Coins;

import java.util.List;

public interface CoinsServices {

    List<Coins> getCoinsList(int page) throws Exception;

    String getMarketChart(String coindId , int days) throws Exception;
    String getCoinsDetails(String coindId ) throws Exception;

    Coins findById(String id) throws Exception;
    String searchCoins(String keyword) throws Exception;
    String getTop50CoinsByMarketCapRenk() throws Exception;
    String getTreadingCoins() throws Exception;
}
