package com.padaria.mapper.brand;

import com.padaria.dto.brand.BrandDTO;
import com.padaria.model.brand.BrandModel;
import org.springframework.stereotype.Component;

@Component
public class BrandMapper {

    public BrandDTO toDTO(BrandModel brandModel) {
        if (brandModel == null) {
            return null;
        }
        return new BrandDTO(
                brandModel.getId(),
                brandModel.getName()
        );
    }

    public BrandModel toEntity(BrandDTO brandDTO) {

        if (brandDTO == null) {
            return null;
        }

        BrandModel brandModel = new BrandModel();
        if (brandDTO.id() != null) {
            brandModel.setId(brandDTO.id());
        }
        brandModel.setName(brandDTO.name());
        return brandModel;
    }

}
