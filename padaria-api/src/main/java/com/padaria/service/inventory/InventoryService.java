package com.padaria.service.inventory;

import com.padaria.dto.inventory.InventoryDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.inventory.InventoryModel;
import com.padaria.repository.inventory.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional
    public InventoryDTO findById(Long id) {
        InventoryModel inventoryModel = inventoryRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return inventoryModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<InventoryDTO>> findALl() {
        List<InventoryModel> inventoryModels = inventoryRepository.findAll();
        List<InventoryDTO> inventoryDTOS = new ArrayList<>();
        inventoryModels.stream().forEach(t -> inventoryDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<InventoryDTO>>(inventoryDTOS, HttpStatus.OK);
    }

    @Transactional
    public InventoryDTO create(InventoryDTO inventoryDTO) {
        InventoryModel inventoryModel = inventoryRepository.save(inventoryDTO.convertDTOToEntity());
        return inventoryModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<InventoryDTO> delete(Long id) {
        inventoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<InventoryDTO> update(InventoryDTO inventoryDTO) {
        InventoryModel inventoryModel = inventoryRepository.findById(inventoryDTO.getItemId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + inventoryDTO.getItemId())
        );

        InventoryDTO dto = inventoryModel.convertEntityToDTO();
        dto.setRequestId(inventoryDTO.getRequestId());
        dto.setItemId(inventoryDTO.getItemId());
        dto.setProductId(inventoryDTO.getProductId());
        dto.setRequestId(inventoryDTO.getRequestId());
        dto.setFiscalNoteId(inventoryDTO.getFiscalNoteId());
        inventoryRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<InventoryDTO>(dto, HttpStatus.OK);
    }

}
