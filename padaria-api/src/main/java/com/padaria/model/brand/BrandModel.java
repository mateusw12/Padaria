package com.padaria.model.brand;

import com.padaria.dto.BrandDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

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

    public BrandDTO convertEntityToDTO() {
        return new ModelMapper().map(this, BrandDTO.class);
    }

}