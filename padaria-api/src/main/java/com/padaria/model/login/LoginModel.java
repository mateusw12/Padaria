package com.padaria.model.login;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginModel implements Serializable {

    public String userName;

    public String password;

}