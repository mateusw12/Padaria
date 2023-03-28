package com.padaria.mapper.unitMeasure;

import com.padaria.dto.unitMeasure.UnitMeasureDTO;
import com.padaria.model.unitMeasure.UnitMeasureModel;
import org.springframework.stereotype.Component;

@Component
public class UnitMeasureMapper {

    public UnitMeasureDTO toDTO(UnitMeasureModel unitMeasureModel) {
        if (unitMeasureModel == null) {
            return null;
        }
        return new UnitMeasureDTO(
                unitMeasureModel.getId(),
                unitMeasureModel.getName(),
                unitMeasureModel.getAbbreviation()
        );
    }

    public UnitMeasureModel toEntity(UnitMeasureDTO unitMeasureDTO) {

        if (unitMeasureDTO == null) {
            return null;
        }

        UnitMeasureModel unitMeasureModel = new UnitMeasureModel();
        if (unitMeasureDTO.id() != null) {
            unitMeasureModel.setId(unitMeasureDTO.id());
        }
        unitMeasureModel.setName(unitMeasureDTO.name());
        return unitMeasureModel;
    }

}
