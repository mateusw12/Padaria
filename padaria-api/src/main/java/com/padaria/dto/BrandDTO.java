package com.padaria.dto;

import com.padaria.model.brand.BrandModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class BrandDTO {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    public BrandModel convertDTOToEntity() {
        return new ModelMapper().map(this, BrandModel.class);
    }

}
