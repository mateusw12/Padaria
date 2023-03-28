package com.padaria.mapper.manufacturer;

import com.padaria.dto.manufacturer.ManufacturerDTO;
import com.padaria.model.manufacturer.ManufacturerModel;
import org.springframework.stereotype.Component;

@Component
public class ManufacturerMapper {

    public ManufacturerDTO toDTO(ManufacturerModel manufacturerModel) {
        if (manufacturerModel == null) {
            return null;
        }
        return new ManufacturerDTO(
                manufacturerModel.getId(),
                manufacturerModel.getName()
        );
    }

    public ManufacturerModel toEntity(ManufacturerDTO manufacturerDTO) {

        if (manufacturerDTO == null) {
            return null;
        }

        ManufacturerModel manufacturerModel = new ManufacturerModel();
        if (manufacturerDTO.id() != null) {
            manufacturerModel.setId(manufacturerDTO.id());
        }
        manufacturerModel.setName(manufacturerDTO.name());
        return manufacturerModel;
    }

}
