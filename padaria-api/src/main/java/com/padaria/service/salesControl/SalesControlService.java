package com.padaria.service.salesControl;

import com.padaria.dto.salesControl.SalesControlDTO;
import com.padaria.dto.salesControl.SalesControlFilterDTO;
import com.padaria.mapper.salesControl.SalesControlMapper;
import com.padaria.repository.salesControl.SalesControlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesControlService {

    @Autowired
    private SalesControlRepository salesControlRepository;

    @Autowired
    private SalesControlMapper salesControlMapper;

    @Transactional
    public SalesControlDTO findById(Long id) {
        return salesControlRepository.findById(id).map(salesControlMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Sales control not found" + id));
    }

    @Transactional
    public List<SalesControlDTO> find(SalesControlFilterDTO salesControlFilterDTO) {
        return salesControlRepository.findAll()
                .stream()
                .map(salesControlMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<SalesControlDTO> create(List<SalesControlDTO> salesControlDTOS) {
        Integer lenght = salesControlDTOS.size();
        for (int i = 0; i < lenght; i++) {
            salesControlRepository.save( salesControlMapper.toEntity(salesControlDTOS.get(i)));
        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    public void delete(Long id) {
        salesControlRepository.delete(salesControlRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sales control not found" + id)));
    }

}
