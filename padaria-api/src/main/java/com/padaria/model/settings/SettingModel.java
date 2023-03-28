package com.padaria.model.settings;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "configuracao")
public class SettingModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="corTema", length = 50)
    public String themeColor;

    @Column(name="logotipo", columnDefinition = "VARCHAR(MAX)")
    public String logo;

    @Column(name="nomeLogo", length = 200)
    public String fileName;

}