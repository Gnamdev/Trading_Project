package com.trading.app.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FunctionResponse {

    private String currencyName ;
    private String functionName ;
    private String currencyData ;

}
