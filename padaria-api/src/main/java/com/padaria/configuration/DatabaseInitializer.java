package com.padaria.configuration;

import com.padaria.model.user.UserModel;
import com.padaria.repository.user.UserRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class DatabaseInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        UserModel userModel = userRepository.findByUserName("mateus");

        if (userModel == null) {
            UserModel user = new UserModel();
            user.setUserName("mateus");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setName("Mateus");
            user.setRole(1L);
            user.setIsActive(true);
            userRepository.save(user);
        }
    }

}
