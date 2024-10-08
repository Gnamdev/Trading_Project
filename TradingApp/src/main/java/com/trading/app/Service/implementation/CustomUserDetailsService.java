package com.trading.app.Service.implementation;

import com.trading.app.Repository.UserRepository;
import com.trading.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User byEmail = userRepository.findByEmail(username);

        if (byEmail == null) {
            throw new UsernameNotFoundException(username);
        }
        List<GrantedAuthority> authoritiesList = new ArrayList<>();
        return  new org.springframework.security.core.userdetails.User(byEmail.getEmail(), byEmail.getPassword(), authoritiesList);
    }
}
