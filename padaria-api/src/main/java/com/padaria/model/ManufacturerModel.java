package com.padaria.model;

import com.padaria.dto.ManufacturerDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity(name= "fabricante")
public class ManufacturerModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    public ManufacturerDTO convertEntityToDTO() {
        return new ModelMapper().map(this, ManufacturerDTO.class);
    }

}