package com.padaria.service;

import com.padaria.dto.PurchaseDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.purchaseControl.PurchaseModel;
import com.padaria.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Transactional
    public PurchaseDTO findById(Long id) {
        PurchaseModel purchaseModel = purchaseRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return purchaseModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<PurchaseDTO>> findALl() {
        List<PurchaseModel> purchaseModels = purchaseRepository.findAll();
        List<PurchaseDTO> purchaseDTOS = new ArrayList<>();
        purchaseModels.stream().forEach(t -> purchaseDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<PurchaseDTO>>(purchaseDTOS, HttpStatus.OK);
    }

    @Transactional
    public PurchaseDTO create(PurchaseDTO brandDTO) {
        PurchaseModel purchaseModel = purchaseRepository.save(brandDTO.convertDTOToEntity());
        return purchaseModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<PurchaseDTO> delete(Long id) {
        purchaseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<PurchaseDTO> update(PurchaseDTO purchaseDTO) {
        PurchaseModel purchaseModel = purchaseRepository.findById(purchaseDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + purchaseDTO.getId())
        );

        PurchaseDTO dto = purchaseModel.convertEntityToDTO();
        dto.setName(purchaseDTO.getName());
        dto.setDescription(purchaseDTO.getDescription());
        dto.setAmount(purchaseDTO.getAmount());
        dto.setPrice(purchaseDTO.getPrice());
        dto.setManufacturerId(purchaseDTO.getManufacturerId());
        dto.setFile(purchaseDTO.getFile());
        dto.setFileName(purchaseDTO.getFileName());
        dto.setFiscalNoteId(purchaseDTO.getFiscalNoteId());
        dto.setPurchaseDate(purchaseDTO.getPurchaseDate());
        dto.setDeliveryDate(purchaseDTO.getDeliveryDate());
        dto.setNoteTypeId(purchaseDTO.getNoteTypeId());
        return new ResponseEntity<PurchaseDTO>(dto, HttpStatus.OK);
    }

}
