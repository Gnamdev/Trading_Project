package com.trading.app.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trading.app.Service.CoinsServices;
import com.trading.app.model.Coins;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinsServices coinsServices;

    @Autowired
    private ObjectMapper mapper;

    @GetMapping
     ResponseEntity<List<Coins>> getAllCoins(
             @RequestParam( required = false, name = "page")
             int page) throws Exception {

         List<Coins> coinsList = coinsServices.getCoinsList(page);

         return new ResponseEntity<>(coinsList , HttpStatus.ACCEPTED);

     }

     @GetMapping("/{coinId}/chart")
     ResponseEntity<JsonNode> getAllCoins(@PathVariable String coinId , @RequestParam("days") int days) throws Exception {

         String marketChart = coinsServices.getMarketChart(coinId, days);

         JsonNode jsonNode = mapper.readTree(marketChart);

         return new ResponseEntity<>(jsonNode , HttpStatus.ACCEPTED);

     }


     @GetMapping("/search")
     ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws Exception {

         String coin = coinsServices.searchCoins(keyword);

         JsonNode jsonNode = mapper.readTree(coin);

         return ResponseEntity.ok(jsonNode
         );

     }

     @GetMapping("/top50")
     ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception {

         String coin = coinsServices.getTop50CoinsByMarketCapRenk();

         JsonNode jsonNode = mapper.readTree(coin);

         return ResponseEntity.ok(jsonNode
         );

     }

     @GetMapping("/trending")
     ResponseEntity<JsonNode> getTreadingCoin() throws Exception {

         String coin = coinsServices.getTreadingCoins();

         JsonNode jsonNode = mapper.readTree(coin);

         return ResponseEntity.ok(jsonNode
         );

     }

     @GetMapping("/details/{coinId}")
     ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception {

         String coin = coinsServices.getCoinsDetails(coinId);

         JsonNode jsonNode = mapper.readTree(coin);

         return ResponseEntity.ok(jsonNode);

     }
}
