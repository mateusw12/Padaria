package com.padaria.model;

import com.padaria.dto.LoginDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.io.Serializable;

@Getter
@Setter
public class LoginModel implements Serializable {

    public String userName;
    public String password;

    public LoginDTO convertEntityToDTO() {
        return new ModelMapper().map(this, LoginDTO.class);
    }

}