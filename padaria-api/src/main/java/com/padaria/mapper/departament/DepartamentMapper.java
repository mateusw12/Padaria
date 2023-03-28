package com.padaria.mapper.departament;

import com.padaria.dto.departament.DepartamentDTO;
import com.padaria.model.departament.DepartamentModel;
import org.springframework.stereotype.Component;

@Component
public class DepartamentMapper {

    public DepartamentDTO toDTO(DepartamentModel departamentModel) {
        if (departamentModel == null) {
            return null;
        }
        return new DepartamentDTO(
                departamentModel.getId(),
                departamentModel.getName()
        );
    }

    public DepartamentModel toEntity(DepartamentDTO departamentDTO) {

        if (departamentDTO == null) {
            return null;
        }

        DepartamentModel departamentModel = new DepartamentModel();
        if (departamentDTO.id() != null) {
            departamentModel.setId(departamentDTO.id());
        }
        departamentModel.setName(departamentDTO.name());
        return departamentModel;
    }

}
