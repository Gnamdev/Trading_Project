package com.trading.app.model;

import com.trading.app.domain.Order_Type;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private Order_Type orderType;
}
