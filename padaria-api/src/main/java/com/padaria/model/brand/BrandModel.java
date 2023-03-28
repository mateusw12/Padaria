package com.padaria.model.brand;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "marca")
public class BrandModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

}