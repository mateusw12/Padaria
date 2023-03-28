package com.padaria.service;

import com.padaria.dto.BuyRequestDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.buyRequest.BuyRequestModel;
import com.padaria.repository.BuyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuyRequestService {

    @Autowired
    private BuyRequestRepository buyRequestRepository;

    @Transactional
    public BuyRequestDTO findById(Long id) {
        BuyRequestModel buyRequestModel = buyRequestRepository.findById(id).orElseThrow(() -> new EntityNotFountException("Id not found" + id));
        return buyRequestModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<BuyRequestDTO>> findALl() {
        List<BuyRequestModel> buyRequestModels = buyRequestRepository.findAll();
        List<BuyRequestDTO> buyRequestDTOS = new ArrayList<>();
        buyRequestModels.stream().forEach(t -> buyRequestDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<BuyRequestDTO>>(buyRequestDTOS, HttpStatus.OK);
    }

    @Transactional
    public BuyRequestDTO create(BuyRequestDTO buyRequestDTO) {
        BuyRequestModel buyRequestModel = buyRequestRepository.save(buyRequestDTO.convertDTOToEntity());
        return buyRequestModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<BuyRequestDTO> delete(Long id) {
        buyRequestRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<BuyRequestDTO> update(BuyRequestDTO buyRequestDTO) {
        BuyRequestModel buyRequestModel = buyRequestRepository.findById(buyRequestDTO.getItemId().longValue()).orElseThrow(() -> new EntityNotFountException("Id not found" + buyRequestDTO.getItemId()));

        BuyRequestDTO dto = buyRequestModel.convertEntityToDTO();

        dto.setAmount(buyRequestDTO.getAmount());
        dto.setObservation(buyRequestDTO.getObservation());
        dto.setRequestId(buyRequestDTO.getRequestId());
        dto.setItemId(buyRequestDTO.getItemId());
        dto.setDeliveryDate(buyRequestDTO.getDeliveryDate());
        dto.setIssueDate(buyRequestDTO.getIssueDate());
        dto.setProductId(buyRequestDTO.getProductId());
        dto.setNoteTypeId(buyRequestDTO.getNoteTypeId());
        dto.setTotalValue(buyRequestDTO.getTotalValue());
        dto.setPaymentCondition(buyRequestDTO.getPaymentCondition());
        dto.setEmployeeId(buyRequestDTO.getEmployeeId());
        dto.setSupplierId(buyRequestDTO.getSupplierId());
        buyRequestRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<BuyRequestDTO>(dto, HttpStatus.OK);
    }

}
