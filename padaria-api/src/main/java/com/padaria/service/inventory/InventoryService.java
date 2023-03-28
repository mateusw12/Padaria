package com.padaria.service.inventory;

import com.padaria.dto.inventory.InventoryDTO;
import com.padaria.mapper.inventory.InventoryMapper;
import com.padaria.repository.inventory.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryMapper inventoryMapper;

    @Transactional
    public InventoryDTO findById(Long id) {
        return inventoryRepository.findById(id).map(inventoryMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found" + id));
    }

    @Transactional
    public List<InventoryDTO> findALl() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public InventoryDTO create(InventoryDTO inventoryDTO) {
        return inventoryMapper.toDTO(inventoryRepository.save(inventoryMapper.toEntity(inventoryDTO)));
    }

    @Transactional
    public void delete(Long id) {
        inventoryRepository.delete(inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found" + id)));
    }

    @Transactional
    public InventoryDTO update(Long id, InventoryDTO inventoryDTO) {
        return inventoryRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setRequestId(inventoryDTO.requestId());
                    recordFound.setItemId(inventoryDTO.itemId());
                    recordFound.setProductId(inventoryDTO.productId());
                    recordFound.setFiscalNoteId(inventoryDTO.fiscalNoteId());
                    return inventoryMapper.toDTO(inventoryRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Hospital not found" + id));
    }

}
