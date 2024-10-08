package com.trading.app.Controller;

import com.trading.app.Service.AssetServie;
import com.trading.app.Service.UserService;
import com.trading.app.model.Asset;
import com.trading.app.model.User;
import org.hibernate.mapping.BasicValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {


    private AssetServie assetServie;

    private UserService userService;

    public AssetController(AssetServie assetServie, UserService userService) {
            this.assetServie = assetServie;
        this.userService = userService;
    }


    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) {
        Asset assetById = assetServie.getAssetById(assetId);

        return new ResponseEntity<>(assetById , HttpStatus.OK) ;
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId , @RequestHeader("Authorization") String jwt) throws  Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Asset assetByUserAndCoinsId = assetServie.findAssetByUserAndCoinsId(user.getId(), coinId);

        return ResponseEntity.ok().body(assetByUserAndCoinsId);
    }

    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser( @RequestHeader("Authorization") String jwt) throws  Exception {

        User user = userService.findUserProfileByJwt(jwt);

        List<Asset> allAssets = assetServie.getAllAssets(user.getId());

        return ResponseEntity.ok().body(allAssets);
    }
}
