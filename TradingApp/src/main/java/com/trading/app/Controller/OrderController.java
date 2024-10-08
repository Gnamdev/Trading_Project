package com.trading.app.Controller;

import com.trading.app.Service.CoinsServices;
import com.trading.app.Service.OrderService;
import com.trading.app.Service.UserService;
import com.trading.app.Service.WalletService;
import com.trading.app.domain.Order_Type;
import com.trading.app.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @Autowired
    private CoinsServices coinsServices;
//    @Autowired
//    private WalletTransactionService walletTransactionService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest request
    ) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);
        Coins coins = coinsServices.findById(request.getCoinId());

        Order order = orderService.processOrder(coins, request.getQuantity(), request.getOrderType() ,user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable  Long orderId
    ) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);

        Order orderById = orderService.getOrderById(orderId);

        if (orderById.getUser().getId().equals(user.getId())) {
            return ResponseEntity.ok(orderById);
        }
        else {
            throw new Exception("you dont have permission");
        }

    }
 @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) Order_Type order_type,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception{

        if (jwt == null) {
            throw new Exception("token missing ..");
        }


        Long userId = userService.findUserProfileByJwt(jwt).getId();

     List<Order> allOrdersOfUser = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);

      return ResponseEntity.ok(allOrdersOfUser);

    }



}
