package com.trading.app.FormData;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trading.app.domain.User_Role;
import com.trading.app.model.TwoFactoreAuthentication;
import jakarta.persistence.Embedded;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterFormData {


    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 50, message = "Full name must be between 2 and 50 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4, message = "Password must be at least 4 characters")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{4,}$", message = "Password must contain at least one letter and one number")
    private String password;





}
