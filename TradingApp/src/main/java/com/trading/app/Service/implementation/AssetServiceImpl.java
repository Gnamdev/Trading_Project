package com.trading.app.Service.implementation;

import com.trading.app.Repository.AssetRepo;
import com.trading.app.Service.AssetServie;
import com.trading.app.Service.UserService;
import com.trading.app.model.Asset;
import com.trading.app.model.Coins;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetServie {

    @Autowired
    private AssetRepo assetRepo;

    @Autowired
   private UserService userService;

    @Override
    public Asset createAsset(User user, Coins coins, double quantity) {

        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coins);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coins.getCurrentPrice());
        return assetRepo.save(asset);
    }

    @Override
    public Asset getAssetById(Long id) {
        return assetRepo.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, Long id) {
        return null;
    }

    @Override
    public List<Asset> getAllAssets(Long userId) {
        return assetRepo.findByUserId(userId);
    }

    @Override
    public Asset updateAsset(Long id, double quantity) {

        Asset oldAsset = getAssetById(id);
        oldAsset.setQuantity(quantity * oldAsset.getQuantity());
      return   assetRepo.save(oldAsset);


    }

    @Override
    public Asset findAssetByUserAndCoinsId(Long userId, String coinId) {

       return assetRepo.findByUserIdAndCoinId(userId ,coinId);

    }

    @Override
    public void deleteAsset(Long id) {

        assetRepo.deleteById(id);
    }
}
