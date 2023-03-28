package com.padaria.dto;

import com.padaria.model.manufacturer.ManufacturerModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class ManufacturerDTO extends RepresentationModel<ManufacturerDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    public ManufacturerModel convertDTOToEntity() {
        return new ModelMapper().map(this, ManufacturerModel.class);
    }

}
