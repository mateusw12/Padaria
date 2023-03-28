package com.padaria.model;

import com.padaria.dto.NoteTypeDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "tipoNota")
public class NoteTypeModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="sigla", length = 10)
    public String abbreviation;

    public NoteTypeDTO convertEntityToDTO() {
        return new ModelMapper().map(this, NoteTypeDTO.class);
    }

}