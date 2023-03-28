package com.padaria.service;

import com.padaria.dto.SalesRequestDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.salesRequest.SalesRequestModel;
import com.padaria.repository.SalesRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalesRequestService {

    @Autowired
    private SalesRequestRepository salesRequestRepository;

    @Transactional
    public SalesRequestDTO findById(Long id) {
        SalesRequestModel salesRequestModel = salesRequestRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return salesRequestModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<SalesRequestDTO>> findALl() {
        List<SalesRequestModel> salesRequestModels = salesRequestRepository.findAll();
        List<SalesRequestDTO> salesRequestDTOS = new ArrayList<>();
        salesRequestModels.stream().forEach(t -> salesRequestDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<SalesRequestDTO>>(salesRequestDTOS, HttpStatus.OK);
    }

    @Transactional
    public SalesRequestDTO create(SalesRequestDTO salesRequestDTO) {
        SalesRequestModel salesRequestModel = salesRequestRepository.save(salesRequestDTO.convertDTOToEntity());
        return salesRequestModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<SalesRequestDTO> delete(Long id) {
        salesRequestRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<SalesRequestDTO> update(SalesRequestDTO salesRequestDTO) {
        SalesRequestModel salesRequestModel = salesRequestRepository.findById(salesRequestDTO.getItemId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + salesRequestDTO.getItemId())
        );

        SalesRequestDTO dto = salesRequestModel.convertEntityToDTO();
        dto.setAmount(salesRequestDTO.getAmount());
        dto.setObservation(salesRequestDTO.getObservation());
        dto.setRequestId(salesRequestDTO.getRequestId());
        dto.setItemId(salesRequestDTO.getItemId());
        dto.setProductId(salesRequestDTO.getProductId());
        dto.setNoteTypeId(salesRequestDTO.getNoteTypeId());
        dto.setTotalValue(salesRequestDTO.getTotalValue());
        dto.setPaymentCondition(salesRequestDTO.getPaymentCondition());
        dto.setEmployeeId(salesRequestDTO.getEmployeeId());
        dto.setSupplierId(salesRequestDTO.getSupplierId());
        salesRequestRepository.save(salesRequestDTO.convertDTOToEntity());
        return new ResponseEntity<SalesRequestDTO>(salesRequestDTO, HttpStatus.OK);
    }

}
