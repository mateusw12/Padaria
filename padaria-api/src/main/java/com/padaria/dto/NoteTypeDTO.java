package com.padaria.dto;

import com.padaria.model.NoteTypeModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class NoteTypeDTO extends RepresentationModel<NoteTypeDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 10)
    public String abbreviation;

    public NoteTypeModel convertDTOToEntity() {
        return new ModelMapper().map(this, NoteTypeModel.class);
    }

}
