package com.padaria.validator.User;

import com.padaria.model.user.UserModel;
import com.padaria.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class UserCustomValidation {

    private final UserRepository userRepository;

    public UserCustomValidation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean validateActiveUser(String userName) {
        UserModel userModel = userRepository.findByUserName(userName);
        return userModel.getIsActive();
    }

}
