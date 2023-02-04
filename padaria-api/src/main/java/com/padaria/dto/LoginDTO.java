package com.padaria.dto;

import com.padaria.model.LoginModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.validation.constraints.NotNull;

@Setter
@Getter
public class LoginDTO extends RepresentationModel<LoginDTO> {

    @NotNull()
    @Length(max = 200)
    public String userName;

    @NotNull()
    @Length(max = 50)
    public String password;

    public LoginModel convertDTOToEntity() {
        return new ModelMapper().map(this, LoginModel.class);
    }

}
