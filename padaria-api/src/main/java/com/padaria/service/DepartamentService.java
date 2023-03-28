package com.padaria.service;

import com.padaria.dto.departament.DepartamentDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.departament.DepartamentModel;
import com.padaria.repository.departament.DepartamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartamentService {

    @Autowired
    private DepartamentRepository departamentRepository;

    @Transactional
    public DepartamentDTO findById(Long id) {
        DepartamentModel departamentModel = departamentRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return departamentModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<DepartamentDTO>> findALl() {
        List<DepartamentModel> departamentModels = departamentRepository.findAll();
        List<DepartamentDTO> departamentDTOS = new ArrayList<>();
        departamentModels.stream().forEach(t -> departamentDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<DepartamentDTO>>(departamentDTOS, HttpStatus.OK);
    }

    @Transactional
    public DepartamentDTO create(DepartamentDTO departamentDTO) {
        DepartamentModel departamentModel = departamentRepository.save(departamentDTO.convertDTOToEntity());
        return departamentModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<DepartamentDTO> delete(Long id) {
        departamentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<DepartamentDTO> update(DepartamentDTO departamentDTO) {
        DepartamentModel departamentModel = departamentRepository.findById(departamentDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + departamentDTO.getId())
        );

        DepartamentDTO dto = departamentModel.convertEntityToDTO();

        dto.setName(departamentDTO.getName());
        departamentRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<DepartamentDTO>(dto, HttpStatus.OK);
    }

}
