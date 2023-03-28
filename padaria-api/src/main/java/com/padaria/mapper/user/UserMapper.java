package com.padaria.mapper.user;

import com.padaria.dto.user.UserDTO;
import com.padaria.model.user.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    private PasswordEncoder encoder;

    public UserDTO toDTO(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        return new UserDTO(
                userModel.getId(),
                userModel.getName(),
                userModel.getUserName(),
                encoder.encode(userModel.getPassword()),
                userModel.getEmail(),
                userModel.getIsActive(),
                userModel.getIsDarkMode(),
                userModel.getRole()
        );
    }

    public UserModel toEntity(UserDTO userDTO) {

        if (userDTO == null) {
            return null;
        }

        UserModel userModel = new UserModel();
        if (userDTO.id() != null) {
            userModel.setId(userDTO.id());
        }
        userModel.setName(userDTO.name());
        userModel.setEmail(userDTO.email());
        userModel.setIsActive(userDTO.isActive());
        userModel.setIsDarkMode(userDTO.isDarkMode());
        userModel.setPassword(encoder.encode(userDTO.password()));
        userModel.setRole(userDTO.role());
        userModel.setUserName(userDTO.userName());
        return userModel;
    }

}
