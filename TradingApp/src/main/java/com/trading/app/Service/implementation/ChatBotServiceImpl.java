package com.trading.app.Service.implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trading.app.Response.ApiResponse;
import com.trading.app.Response.FunctionResponse;
import com.trading.app.Service.AIChatService;

import com.trading.app.Service.CoinsServices;
import com.trading.app.model.Coins;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Slf4j
public class ChatBotServiceImpl implements AIChatService {

    @Value("${GEMINI_API_KEY}")
    String GEMINI_API_KEY;

    @Autowired
    private CoinsServices coinsServices;

    @Autowired
    private ObjectMapper mapper;

    // function calling

    public FunctionResponse getFunctionResponse(String prompt) {
//        String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;
        String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

        // Build the request JSON
        JSONObject jsonObject = new JSONObject()
                .put("contents", new JSONArray()
                        .put(new JSONObject()
                                .put("parts", new JSONArray()
                                        .put(new JSONObject()
                                                .put("text", prompt)))))
                .put("tools", new JSONArray()
                        .put(new JSONObject()
                                .put("functionDeclarations", new JSONArray()
                                        .put(new JSONObject()
                                                .put("name", "getCoinDetails")
                                                .put("description", "Get the coin details from given currency object")
                                                .put("parameters", new JSONObject()
                                                        .put("type", "OBJECT")
                                                        .put("properties", new JSONObject()
                                                                .put("currencyName", new JSONObject()
                                                                        .put("type", "STRING")
                                                                        .put("description", "The currency name, id, symbol."))
                                                                .put("currencyData", new JSONObject()
                                                                        .put("type", "STRING")
                                                                        .put("description", "Currency data including fields such as id, symbol, name, current_price, market_cap, etc.")))
                                                        .put("required", new JSONArray()
                                                                .put("currencyName")
                                                                .put("currencyData")
                                                        )
                                                )
                                        )
                                )
                        )
                );

        // Set up headers and send the request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonObject.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);
        String responseBody = response.getBody();

        // Check if the response body is null
        if (responseBody == null) {
            System.err.println("Received null response body from API.");
            return null;  // Or handle according to your error handling strategy
        }

        // Log the full response for debugging
        System.out.println("Full API response: " + responseBody);

        JSONObject jsonObjectResponse = new JSONObject(responseBody);
        FunctionResponse functionResponse = new FunctionResponse();

        try {
            if (jsonObjectResponse.has("candidates")) {
                JSONArray candidates = jsonObjectResponse.getJSONArray("candidates");
                if (candidates.length() > 0) {
                    JSONObject firstCandidate = candidates.getJSONObject(0);

                    // Navigate to 'content' -> 'parts'
                    if (firstCandidate.has("content")) {
                        JSONObject content = firstCandidate.getJSONObject("content");
                        if (content.has("parts")) {
                            JSONArray parts = content.getJSONArray("parts");

                            if (parts.length() > 0) {
                                JSONObject firstPart = parts.getJSONObject(0);

                                if (firstPart.has("functionCall")) {
                                    JSONObject functionCall = firstPart.getJSONObject("functionCall");
                                    functionResponse.setFunctionName(functionCall.optString("name"));

                                    JSONObject args = functionCall.optJSONObject("args");
                                    if (args != null) {
                                        functionResponse.setCurrencyName(args.optString("currencyName"));
                                        functionResponse.setCurrencyData(args.optString("currencyData"));
                                    }
                                }
                            }
                        }
                    }
                }
            }

            log.info("function response ---> {}", functionResponse);
        } catch (JSONException e) {
            e.printStackTrace();
            System.err.println("JSON Parsing error: " + e.getMessage());
        }

        return functionResponse;
    }



    public Coins makeApiReq(String coinId) throws Exception {

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

//            coinsReposistory.save(coins);

            log.info("coins details with prompt ---> " + coins + " " + coinId);

            return  coins;

        }catch (HttpServerErrorException | HttpClientErrorException e) {

            log.info("make api call error  inside ---"  , coinId);
            throw new Exception(e.getMessage());
        }



    }





    @Override
    public ApiResponse getCoinsDetails(String prompt) throws Exception {
        FunctionResponse functionResponse = getFunctionResponse(prompt);
        log.info("Function response for getting coin details --> {}", functionResponse.toString());

        // Make API request to get coin details
        Coins coins = makeApiReq(functionResponse.getCurrencyName().toLowerCase());

        String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build the request body for the API call
        String body = new JSONObject()
                .put("contents", new JSONArray()
                        .put(new JSONObject()
                                .put("role", "user")
                                .put("parts", new JSONArray()
                                        .put(new JSONObject()
                                                .put("text", prompt))))
                        .put(new JSONObject()
                                .put("role", "model")
                                .put("parts", new JSONArray()
                                        .put(new JSONObject()
                                                .put("functionCall", new JSONObject()
                                                        .put("name", "getCoinDetails")
                                                        .put("args", new JSONObject()
                                                                .put("currencyName", functionResponse.getCurrencyName())
                                                                .put("currencyData", functionResponse.getCurrencyData()))))))
                        .put(new JSONObject()
                                .put("role", "function")
                                .put("parts", new JSONArray()
                                        .put(new JSONObject()
                                                .put("functionResponse", new JSONObject()
                                                        .put("name", "getCoinDetails")
                                                        .put("response", new JSONObject()
                                                                .put("name", "getCoinDetails")
                                                                .put("content", coins)))))))
                .put("tools", new JSONArray()
                        .put(new JSONObject()
                                .put("functionDeclarations", new JSONArray()
                                        .put(new JSONObject()
                                                .put("name", "getCoinDetails")
                                                .put("description", "Get crypto currency data from given currency object.")
                                                .put("parameters", new JSONObject()
                                                        .put("type", "OBJECT")
                                                        .put("properties", new JSONObject()
                                                                .put("currencyName", new JSONObject()
                                                                        .put("type", "STRING")
                                                                        .put("description", "The currency name, id, symbol."))
                                                                .put("currencyData", new JSONObject()
                                                                        .put("type", "STRING")
                                                                        .put("description", "The currency data including id, symbol, current price, image, market cap, etc.")))
                                                        .put("required", new JSONArray()
                                                                .put("currencyName")
                                                                .put("currencyData"))))))).toString();

        // Set up the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        // Send the request to the API
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);

//        log.info("getCoin details res =====>{}",response );



        // Extract the text inside "parts" from the response
        JSONObject jsonResponse = new JSONObject(response.getBody());
        JSONArray candidates = jsonResponse.getJSONArray("candidates");
        if (candidates.length() > 0) {
            JSONArray parts = candidates.getJSONObject(0).getJSONObject("content").getJSONArray("parts");
            if (parts.length() > 0) {
                String extractedText = parts.getJSONObject(0).getString("text");
                // Set the extracted text into ApiResponse
                ApiResponse ans = new ApiResponse();
                ans.setMessage(extractedText); // Set the extracted message here

                // Log the response
                log.info("Answer --------> {}", ans);
                return ans;
            }
        }

        // In case of no candidates or parts, return an empty response or handle accordingly
        ApiResponse emptyResponse = new ApiResponse();
        emptyResponse.setMessage("No details available.");
        return emptyResponse;

    }


    @Override
    public String simpleChatService(String prompt) {
        String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

        // Use HttpHeaders from Spring instead of com.sun.net.httpserver.Headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Build the JSON request body
        String requestBody = new JSONObject()
                .put("contents", new JSONArray()
                        .put(new JSONObject()
                                .put("parts", new JSONArray()
                                        .put(new JSONObject()
                                                .put("text", prompt)))))
                .toString();

        // Create HttpEntity with headers and body
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send the POST request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);

        return response.getBody();
    }
}
