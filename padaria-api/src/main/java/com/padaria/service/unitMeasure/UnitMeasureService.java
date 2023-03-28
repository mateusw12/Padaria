package com.padaria.service.unitMeasure;

import com.padaria.dto.unitMeasure.UnitMeasureDTO;
import com.padaria.mapper.unitMeasure.UnitMeasureMapper;
import com.padaria.repository.unitMeasure.UnitMeasureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitMeasureService {

    @Autowired
    private UnitMeasureRepository unitMeasureRepository;

    @Autowired
    private UnitMeasureMapper unitMeasureMapper;

    @Transactional
    public UnitMeasureDTO findById(Long id) {
        return unitMeasureRepository.findById(id).map(unitMeasureMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Unit measure not found" + id));
    }

    @Transactional
    public List<UnitMeasureDTO> findALl() {
        return unitMeasureRepository.findAll()
                .stream()
                .map(unitMeasureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UnitMeasureDTO create(UnitMeasureDTO unitMeasureDTO) {
        return unitMeasureMapper.toDTO(unitMeasureRepository.save(unitMeasureMapper.toEntity(unitMeasureDTO)));
    }

    @Transactional
    public void delete(Long id) {
        unitMeasureRepository.delete(unitMeasureRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Unit measure not found" + id)));
    }

    @Transactional
    public UnitMeasureDTO update(Long id, UnitMeasureDTO unitMeasureDTO) {
        return unitMeasureRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(unitMeasureDTO.name());
                    recordFound.setAbbreviation(unitMeasureDTO.abbreviation());
                    return unitMeasureMapper.toDTO(unitMeasureRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Unit measure not found" + id));
    }

}
