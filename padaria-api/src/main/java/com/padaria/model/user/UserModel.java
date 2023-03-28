package com.padaria.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.padaria.dto.UserDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
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

    @Column(name="perfil", nullable = false, length = 100)
    public Long role;

    @Column(name="modoEscuro")
    public Boolean isDarkMode;

    public UserDTO convertEntityToDTO() {
        return new ModelMapper().map(this, UserDTO.class);
    }

}