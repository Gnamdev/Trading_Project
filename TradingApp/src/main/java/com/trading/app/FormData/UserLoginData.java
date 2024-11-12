package com.trading.app.FormData;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginData {
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 4, message = "Password must be at least 4 characters")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{4,}$", message = "Password must contain at least one letter and one number")
    private String password;
}
