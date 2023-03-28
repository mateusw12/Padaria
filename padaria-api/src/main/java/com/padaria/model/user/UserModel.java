package com.padaria.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.padaria.converter.role.RoleConverter;
import com.padaria.dto.user.UserDTO;
import com.padaria.model.role.Role;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity(name= "usuario")
public class UserModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="nomeUsuario", nullable = false, length = 200, unique = true)
    public String userName;

    @Column(name="email", length = 300)
    public String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name="senha", nullable = false, length = 200)
    public String password;

    @Column(name="ativo")
    public Boolean isActive;

    @NotNull
    @Convert(converter = RoleConverter.class)
    @Column(name="perfil", nullable = false, length = 100)
    public Role role;

    @Column(name="modoEscuro")
    public Boolean isDarkMode;

}