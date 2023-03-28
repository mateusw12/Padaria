package com.padaria.model.manufacturer;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "fabricante")
public class ManufacturerModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

}