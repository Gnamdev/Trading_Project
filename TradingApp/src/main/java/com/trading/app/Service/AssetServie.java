package com.trading.app.Service;


import com.trading.app.model.Asset;
import com.trading.app.model.Coins;
import com.trading.app.model.User;

import java.util.List;

public interface AssetServie {

    Asset createAsset(User user , Coins coins , double quantity);

    Asset getAssetById(Long id);

    Asset getAssetByUserIdAndId(Long userId, Long id);

    List<Asset> getAllAssets(Long userId);

    Asset updateAsset(Long id , double quantity);

    Asset findAssetByUserAndCoinsId(Long userId,String coinId);

    void deleteAsset(Long id);
}
