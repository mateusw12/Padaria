package com.padaria.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.padaria.converter.role.RoleConverter;
import com.padaria.model.role.Role;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Convert;
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
        @NotNull @Convert(converter = RoleConverter.class) Role role
) {

}
