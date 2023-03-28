package com.padaria.dto;

import com.padaria.model.unitMeasure.UnitMeasureModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class UnitMeasureDTO extends RepresentationModel<UnitMeasureDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 5)
    public String abbreviation;

    public UnitMeasureModel convertDTOToEntity() {
        return new ModelMapper().map(this, UnitMeasureModel.class);
    }

}
