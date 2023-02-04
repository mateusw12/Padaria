package com.padaria.dto;

import com.padaria.model.DepartamentModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class DepartamentDTO extends RepresentationModel<DepartamentDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    public DepartamentModel convertDTOToEntity() {
        return new ModelMapper().map(this, DepartamentModel.class);
    }

}
