package com.trading.app.Service;

import com.trading.app.Response.ApiResponse;
import com.trading.app.model.Coins;

import java.util.List;

public interface AIChatService {

   ApiResponse getCoinsDetails(String prompt) throws Exception;



    String simpleChatService(String prompt);
}
