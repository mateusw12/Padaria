package com.padaria.model.manufacturer;

import com.padaria.dto.manufacturer.ManufacturerDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

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

    public ManufacturerDTO convertEntityToDTO() {
        return new ModelMapper().map(this, ManufacturerDTO.class);
    }

}