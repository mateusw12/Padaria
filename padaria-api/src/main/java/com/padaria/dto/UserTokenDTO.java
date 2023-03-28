package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.util.Date;

public record UserTokenDTO(
        @NotNull() @Length(max = 200) String userName,
        @NotNull() @Length(max = 500) String token,
        @NotNull() Date expirationDate
) {

}
