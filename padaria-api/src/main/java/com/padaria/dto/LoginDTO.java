package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;


public record LoginDTO(
        @NotNull() @Length(max = 200) String userName,
        @NotNull() @Length(max = 50) String password
) {

}
