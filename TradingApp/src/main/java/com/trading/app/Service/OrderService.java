package com.trading.app.Service;

import com.trading.app.domain.Order_Type;
import com.trading.app.model.Coins;
import com.trading.app.model.Order;
import com.trading.app.model.OrderItem;
import com.trading.app.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user , OrderItem orderItem , Order_Type order_Type);

    Order getOrderById(Long id) throws Exception;
    List<Order> getAllOrdersOfUser(Long id , Order_Type orderType , String assetSymbol );

    Order processOrder(Coins coin , double quantity , Order_Type orderType , User user) throws Exception;
}
