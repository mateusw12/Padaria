package com.padaria.service.manufacturer;

import com.padaria.dto.manufacturer.ManufacturerDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.manufacturer.ManufacturerModel;
import com.padaria.repository.manufacturer.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Transactional
    public ManufacturerDTO findById(Long id) {
        ManufacturerModel manufacturerModel = manufacturerRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return manufacturerModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<ManufacturerDTO>> findALl() {
        List<ManufacturerModel> manufacturerModels = manufacturerRepository.findAll();
        List<ManufacturerDTO> manufacturerDTOS = new ArrayList<>();
        manufacturerModels.stream().forEach(t -> manufacturerDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<ManufacturerDTO>>(manufacturerDTOS, HttpStatus.OK);
    }

    @Transactional
    public ManufacturerDTO create(ManufacturerDTO jobDTO) {
        ManufacturerModel manufacturerModel = manufacturerRepository.save(jobDTO.convertDTOToEntity());
        return manufacturerModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<ManufacturerDTO> delete(Long id) {
        manufacturerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<ManufacturerDTO> update(ManufacturerDTO manufacturerDTO) {
        ManufacturerModel manufacturerModel = manufacturerRepository.findById(manufacturerDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + manufacturerDTO.getId())
        );

        ManufacturerDTO dto = manufacturerModel.convertEntityToDTO();
        dto.setName(manufacturerDTO.getName());
        manufacturerRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<ManufacturerDTO>(dto, HttpStatus.OK);
    }

}
