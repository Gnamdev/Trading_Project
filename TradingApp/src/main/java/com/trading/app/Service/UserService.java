package com.trading.app.Service;

import com.trading.app.domain.VerificationType;
import com.trading.app.model.User;

public interface UserService {
    User findUserProfileByJwt (String jwt) throws Exception;
    User findUserProfileByEmail(String email);

    User findUserById(Long id) throws Exception;
    User enableTwoFactorAuthentication(VerificationType verificationType ,String sendTo, User user);

    User updatePassword(User user, String newPassword);
}
