package com.trading.app.model;

import com.trading.app.domain.VerificationType;
import jakarta.persistence.Entity;
import lombok.Data;


@Data
public class TwoFactoreAuthentication {
    private  boolean isEnabled = false;
    private VerificationType sendTo;

}
