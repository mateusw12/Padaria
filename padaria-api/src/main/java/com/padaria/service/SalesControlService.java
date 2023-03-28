package com.padaria.service;

import com.padaria.dto.SalesControlDTO;
import com.padaria.dto.SalesControlFilterDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.salesControl.SalesControlModel;
import com.padaria.repository.SalesControlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalesControlService {

    @Autowired
    private SalesControlRepository salesControlRepository;

    @Transactional
    public SalesControlDTO findById(Long id) {
        SalesControlModel salesControlModel = salesControlRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return salesControlModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<SalesControlDTO>> find(SalesControlFilterDTO salesControlFilterDTO) {
        List<SalesControlModel> salesControlModels = salesControlRepository.findAll();
        List<SalesControlDTO> salesControlDTOS = new ArrayList<>();
        salesControlModels.stream().forEach(t -> salesControlDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<SalesControlDTO>>(salesControlDTOS, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<SalesControlDTO> create(List<SalesControlDTO> salesControlDTOS) {
        Integer lenght = salesControlDTOS.size();
        for (int i = 0; i < lenght; i++) {
            salesControlRepository.save(salesControlDTOS.get(i).convertDTOToEntity());
        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<SalesControlDTO> delete(Long id) {
        salesControlRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
