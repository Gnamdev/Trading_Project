package com.trading.app.Service.implementation;

import com.trading.app.Config.JwtProvider;
import com.trading.app.Repository.UserRepository;
import com.trading.app.Service.UserService;
import com.trading.app.domain.VerificationType;
import com.trading.app.model.TwoFactoreAuthentication;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserserviceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String emailFromToken = JwtProvider.getEmailFromToken(jwt);

        User byEmailUser = userRepository.findByEmail(emailFromToken);
        if (byEmailUser == null) {
            throw new Exception("User not Found");
        }
        return byEmailUser;
    }

    @Override
    public User findUserProfileByEmail(String email) {


        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserById(Long id) throws Exception {
        Optional<User> byId = userRepository.findById(id);

        if (byId.isEmpty()) {
            throw new Exception("User not Found ");
        }
         return byId.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) {

        TwoFactoreAuthentication twoFactoreAuthentication = new TwoFactoreAuthentication();
        twoFactoreAuthentication.setEnabled(true);
        twoFactoreAuthentication.setSendTo(verificationType);
        user.setTwoFactoreAuthentication(twoFactoreAuthentication);
        return userRepository.save(user);


    }


    @Override
    public User updatePassword(User user, String newPassword) {
      user.setPassword(newPassword);
      return userRepository.save(user);
    }
}
