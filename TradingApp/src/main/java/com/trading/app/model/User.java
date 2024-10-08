package com.trading.app.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trading.app.domain.User_Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;

    private String fullName ;
    private String email ;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password ;

    private User_Role userRole = User_Role.ROLE_CUSTOMER;

   @Embedded
  private  TwoFactoreAuthentication twoFactoreAuthentication = new TwoFactoreAuthentication();



}
