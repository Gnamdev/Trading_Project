package com.trading.app.Service.implementation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trading.app.Repository.CoinsReposistory;
import com.trading.app.Service.CoinsServices;
import com.trading.app.model.Coins;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.Optional;

@Service
public class CoinsServiceImpl implements CoinsServices {

    @Autowired
    private CoinsReposistory coinsReposistory;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public List<Coins> getCoinsList(int page) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page="+page;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );

            List<Coins> coinsList = mapper.readValue(res.getBody(), new TypeReference<List<Coins>>() {});

            return  coinsList;
        }catch (HttpServerErrorException | HttpClientErrorException e) {
            throw new Exception(e.getMessage());
        }


    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {

//        https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2

        String url = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency=usd&days="+days;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );
            return  res.getBody();

        }catch (HttpServerErrorException | HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new Exception("Coin not found: " + coinId);
            } else {
                throw new Exception("API call failed: " + e.getMessage());
            }
        }
    }

    @Override
    public String getCoinsDetails(String coinId) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/"+coinId;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );

            JsonNode node = mapper.readTree(res.getBody());

            Coins coins = new Coins();

            coins.setId(node.get("id").asText());
            coins.setName(node.get("name").asText());
            coins.setSymbol(node.get("symbol").asText());
            coins.setImage(node.get("image").get("large").asText());

            JsonNode marketData = node.get("market_data");

            coins.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());

            coins.setMarketCap(marketData.get("market_cap").get("usd").asLong());

            coins.setMarketCapRank(marketData.get("market_cap_rank").asInt());

            coins.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coins.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coins.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coins.setPriceChangePercentage24h(
                    marketData.get("price_change_percentage_24h").asDouble()
            );


            coins.setPriceChange24h(marketData.get("price_change_24h").asDouble());

            coins.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong());
            coins.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asLong());

            coins.setTotalSupply(marketData.get("total_supply").asLong());

            coinsReposistory.save(coins);

            return  res.getBody();

        }catch (HttpServerErrorException | HttpClientErrorException e) {
            throw new Exception(e.getMessage());
        }

    }

    @Override
    public Coins findById(String id) throws Exception {

        Optional<Coins> optionCoins = coinsReposistory.findById(id);

        if (optionCoins.isEmpty()) {
            throw new Exception("coin not found ");
        }

        return optionCoins.get();

    }

    @Override
    public String searchCoins(String keyword) throws Exception {
        String url = "https://api.coingecko.com/api/v3/search?query="+keyword;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );

            return  res.getBody();


        }catch (HttpServerErrorException | HttpClientErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRenk() throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page="+1;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );

          return  res.getBody();
        }catch (HttpServerErrorException | HttpClientErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTreadingCoins() throws Exception {
        String url = "https://api.coingecko.com/api/v3/search/trending";

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters",headers);

            ResponseEntity<String> res = restTemplate.exchange(url , HttpMethod.GET , entity, String.class );

           return  res.getBody();
        }catch (HttpServerErrorException | HttpClientErrorException e) {
            throw new Exception(e.getMessage());
        }
    }
}
