package com.padaria.model.login;

import com.padaria.dto.login.LoginDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.io.Serializable;

@Data
public class LoginModel implements Serializable {

    public String userName;
    public String password;

    public LoginDTO convertEntityToDTO() {
        return new ModelMapper().map(this, LoginDTO.class);
    }

}