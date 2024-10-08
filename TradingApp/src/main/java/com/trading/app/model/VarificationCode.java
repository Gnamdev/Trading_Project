package com.trading.app.model;

import com.trading.app.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VarificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    @OneToOne
    private User user;

    private String email;
    private String mobileNumber;
    private VerificationType verificationType;


}
