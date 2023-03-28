package com.padaria.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.padaria.model.user.UserModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class UserDTO  extends RepresentationModel<UserDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @NotNull()
    @Length(max = 200)
    public String userName;

    @NotNull()
    @Length(max = 200)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String password;

    @Email()
    @Length(max = 300)
    public String email;

    public Boolean isActive;

    public Boolean isDarkMode;

    public Long role;

    public UserModel convertDTOToEntity() {
        return new ModelMapper().map(this, UserModel.class);
    }

}
