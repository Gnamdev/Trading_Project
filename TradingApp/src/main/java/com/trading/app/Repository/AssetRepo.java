package com.trading.app.Repository;

import com.trading.app.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepo extends JpaRepository<Asset, Long> {
    List<Asset> findByUserId(Long  userId);

    Asset findByUserIdAndCoinId(Long userId, String coins);
}
