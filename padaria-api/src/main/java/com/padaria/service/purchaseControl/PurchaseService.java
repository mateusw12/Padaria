package com.padaria.service.purchaseControl;

import com.padaria.dto.purchaseControl.PurchaseDTO;
import com.padaria.mapper.purchaseControl.PurchaseControlMapper;
import com.padaria.repository.purchaseControl.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private PurchaseControlMapper purchaseControlMapper;

    @Transactional
    public PurchaseDTO findById(Long id) {
        return purchaseRepository.findById(id).map(purchaseControlMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found" + id));
    }

    @Transactional
    public List<PurchaseDTO> findALl() {
        return purchaseRepository.findAll()
                .stream()
                .map(purchaseControlMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PurchaseDTO create(PurchaseDTO purchaseDTO) {
        return purchaseControlMapper.toDTO(purchaseRepository.save(purchaseControlMapper.toEntity(purchaseDTO)));
    }

    @Transactional
    public void delete(Long id) {
        purchaseRepository.delete(purchaseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found" + id)));
    }

    @Transactional
    public PurchaseDTO update(Long id, PurchaseDTO purchaseDTO) {
        return purchaseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(purchaseDTO.name());
                    recordFound.setDescription(purchaseDTO.description());
                    recordFound.setAmount(purchaseDTO.amount());
                    recordFound.setPrice(purchaseDTO.price());
                    recordFound.setManufacturerId(purchaseDTO.manufacturerId());
                    recordFound.setFile(purchaseDTO.file());
                    recordFound.setFileName(purchaseDTO.fileName());
                    recordFound.setFiscalNoteId(purchaseDTO.fiscalNoteId());
                    recordFound.setPurchaseDate(purchaseDTO.purchaseDate());
                    recordFound.setDeliveryDate(purchaseDTO.deliveryDate());
                    recordFound.setNoteTypeId(purchaseDTO.noteTypeId());
                    return purchaseControlMapper.toDTO(purchaseRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Purchase not found" + id));
    }

}
