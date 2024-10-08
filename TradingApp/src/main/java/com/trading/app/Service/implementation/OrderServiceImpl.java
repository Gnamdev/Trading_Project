package com.trading.app.Service.implementation;

import com.trading.app.Repository.OrderItemRepo;
import com.trading.app.Repository.OrderRepo;
import com.trading.app.Service.AssetServie;
import com.trading.app.Service.OrderService;
import com.trading.app.Service.WalletService;
import com.trading.app.domain.OrderStatus;
import com.trading.app.domain.Order_Type;
import com.trading.app.model.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private AssetServie assetServie;


    @Override
    public Order createOrder(User user, OrderItem orderItem, Order_Type order_Type) {

        double price = orderItem.getCoins().getCurrentPrice() * orderItem.getQuantity();

        Order order = new Order();
        order.setUser(user);
        order.setOrderitem(orderItem);
        order.setPrice(BigDecimal.valueOf(price));
        order.setOrder_type(order_Type);
        order.setTimestamp(LocalDateTime.now());
        order.setOrderstatus(OrderStatus.PENDING);


        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(Long id) throws Exception {

        return orderRepo.findById(id).orElseThrow(() -> new Exception("Order not Found"));

    }

    @Override
    public List<Order> getAllOrdersOfUser(Long id, Order_Type orderType, String assetSymbol) {
        return orderRepo.findByUserId(id);
    }

    private  OrderItem createOrderItem(Coins coin, double quantity, double buyPrice, double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoins(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);

        return orderItemRepo.save(orderItem);
    }

    @Transactional
    public  Order buyAsset(Coins coin, double quantity,User user) throws Exception {
        if (quantity <= 0){
            throw new Exception("Quantity should be greater then zero");
        }
        double buyPrice = coin.getCurrentPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);

        Order order = createOrder(user, orderItem, Order_Type.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order , user);
        order.setOrderstatus(OrderStatus.SUCCESS);

        order.setOrder_type(Order_Type.BUY);
        Order saveOrder = orderRepo.save(order);
        //create asset

        Asset oldAssetByUserAndCoinsId = assetServie.findAssetByUserAndCoinsId(order.getUser().getId(), order.getOrderitem().getCoins().getId());

        if (oldAssetByUserAndCoinsId == null) {
            assetServie.createAsset(user , orderItem.getCoins()  , orderItem.getQuantity());

        }else {
            assetServie.updateAsset(oldAssetByUserAndCoinsId.getAssetId() , quantity);
        }


        return saveOrder;
    }

    @Transactional
    public  Order sellAsset(Coins coin, double quantity,User user) throws Exception {
        if (quantity <= 0){
            throw new Exception("Quantity should be greater then zero");
        }
        double sellPrice = coin.getCurrentPrice();

        Asset assetToSell = assetServie.findAssetByUserAndCoinsId(user.getId(), coin.getId());

        double buyAsset = assetToSell.getBuyPrice();
        if ( assetToSell != null) {
            OrderItem orderItem = createOrderItem(coin, quantity,buyAsset ,sellPrice );


           Order order = createOrder(user, orderItem, Order_Type.SELL);
           orderItem.setOrder(order);

        if (assetToSell.getQuantity() >= quantity){
            order.setOrderstatus(OrderStatus.SUCCESS);
            order.setOrder_type(Order_Type.SELL);
            Order saveOrder = orderRepo.save(order);
            walletService.payOrderPayment(order , user);

            Asset updateAsset = assetServie.updateAsset(assetToSell.getAssetId(), -quantity);



            if (updateAsset.getQuantity()*coin.getCurrentPrice()<=1){
                assetServie.deleteAsset(updateAsset.getAssetId());
            }
            return saveOrder;
        }

        throw new Exception("Insufficient quantity to sell");
        }
        throw new Exception("ASSET not found ");

    }
    @Override
    @Transactional
    public Order processOrder(Coins coin, double quantity, Order_Type orderType, User user) throws Exception {

        if (orderType.equals(Order_Type.BUY)) {
            return buyAsset(coin , quantity
            , user);
        } else if (orderType.equals(Order_Type.SELL)) {
            return sellAsset(coin,quantity,user);
        }
         throw new Exception("Invalide order type");
    }


}