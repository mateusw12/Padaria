package com.padaria.model.departament;

import com.padaria.dto.departament.DepartamentDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "departamento")
public class DepartamentModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    public DepartamentDTO convertEntityToDTO() {
        return new ModelMapper().map(this, DepartamentDTO.class);
    }

}