package com.padaria.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public record UserDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @NotNull() @Length(max = 200) String userName,
        @NotNull() @Length(max = 200) @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) String password,
        @Email() @Length(max = 300) String email,
        Boolean isActive,
        Boolean isDarkMode,
        Long role
) {

}
