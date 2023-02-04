package com.padaria.service.Impl;

import com.padaria.model.DetailUserLogin;
import com.padaria.model.UserModel;
import com.padaria.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DetailUserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public DetailUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> userModel = Optional.ofNullable(userRepository.findByUserName(username));
        if (userModel.isEmpty()) {
            throw new UsernameNotFoundException("User [" + username + "] not found!");
        }
        return new DetailUserLogin(userModel);
    }

}
