package com.padaria.model.unitMeasure;

import com.padaria.dto.UnitMeasureDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "unidadeMedida")
public class UnitMeasureModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="sigla", length = 10)
    public String abbreviation;

    public UnitMeasureDTO convertEntityToDTO() {
        return new ModelMapper().map(this, UnitMeasureDTO.class);
    }

}