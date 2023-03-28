package com.padaria.model.user;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class UserTokenModel {

    @NotNull()
    @Length(max = 200)
    public String userName;

    @NotNull()
    @Length(max = 500)
    public String token;

    @NotNull()
    public Date expirationDate;

}
