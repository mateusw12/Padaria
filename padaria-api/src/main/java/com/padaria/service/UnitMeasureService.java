package com.padaria.service;

import com.padaria.dto.UnitMeasureDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.unitMeasure.UnitMeasureModel;
import com.padaria.repository.UnitMeasureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UnitMeasureService {

    @Autowired
    private UnitMeasureRepository unitMeasureRepository;

    @Transactional
    public UnitMeasureDTO findById(Long id) {
        UnitMeasureModel unitMeasureModel = unitMeasureRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return unitMeasureModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<UnitMeasureDTO>> findALl() {
        List<UnitMeasureModel> unitMeasureModels = unitMeasureRepository.findAll();
        List<UnitMeasureDTO> unitMeasureDTOS = new ArrayList<>();
        unitMeasureModels.stream().forEach(t -> unitMeasureDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<UnitMeasureDTO>>(unitMeasureDTOS, HttpStatus.OK);
    }

    @Transactional
    public UnitMeasureDTO create(UnitMeasureDTO unitMeasureDTO) {
        UnitMeasureModel unitMeasureModel = unitMeasureRepository.save(unitMeasureDTO.convertDTOToEntity());
        return unitMeasureModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<UnitMeasureDTO> delete(Long id) {
        unitMeasureRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<UnitMeasureDTO> update(UnitMeasureDTO unitMeasureDTO) {
        UnitMeasureModel unitMeasureModel = unitMeasureRepository.findById(unitMeasureDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + unitMeasureDTO.getId())
        );

        UnitMeasureDTO dto = unitMeasureModel.convertEntityToDTO();
        dto.setName(unitMeasureDTO.getName());
        dto.setAbbreviation(unitMeasureDTO.getAbbreviation());
        unitMeasureRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<UnitMeasureDTO>(dto, HttpStatus.OK);
    }

}
