package com.trading.app.Controller;


import com.trading.app.Response.ApiResponse;
import com.trading.app.Service.AIChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class ChatBotController {

    @Autowired
    private AIChatService chatService;


//    @PostMapping("/chat")
//   public ResponseEntity<String> simpleChat( @RequestBody String prompt){
//
//        String response = chatService.simpleChatService(prompt);
//
//
//        return new ResponseEntity<>(response , HttpStatus.OK);
//    }

    @PostMapping("/real-chat")
    public ResponseEntity<ApiResponse> realChatCall( @RequestBody String prompt) throws Exception {

        ApiResponse coinsDetails = chatService.getCoinsDetails(prompt);





        return new ResponseEntity<>(coinsDetails, HttpStatus.OK);
    }

}
