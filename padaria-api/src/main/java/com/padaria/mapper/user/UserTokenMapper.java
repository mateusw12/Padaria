package com.padaria.mapper.user;

import com.padaria.dto.user.UserTokenDTO;
import com.padaria.model.user.UserTokenModel;
import org.springframework.stereotype.Component;

@Component
public class UserTokenMapper {

    public UserTokenDTO toDTO(UserTokenModel userTokenModel) {
        if (userTokenModel == null) {
            return null;
        }
        return new UserTokenDTO(
                userTokenModel.getUserName(),
                userTokenModel.getToken(),
                userTokenModel.getExpirationDate()
        );
    }

    public UserTokenModel toEntity(UserTokenDTO userTokenDTO) {

        if (userTokenDTO == null) {
            return null;
        }

        UserTokenModel userTokenModel = new UserTokenModel();
        userTokenModel.setToken(userTokenDTO.token());
        userTokenModel.setExpirationDate(userTokenDTO.expirationDate());
        userTokenModel.setUserName(userTokenDTO.userName());
        return userTokenModel;
    }

}
