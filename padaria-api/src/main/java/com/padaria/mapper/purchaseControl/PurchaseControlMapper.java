package com.padaria.mapper.purchaseControl;

import com.padaria.dto.purchaseControl.PurchaseDTO;
import com.padaria.model.purchaseControl.PurchaseModel;
import org.springframework.stereotype.Component;

@Component
public class PurchaseControlMapper {

    public PurchaseDTO toDTO(PurchaseModel purchaseModel) {
        if (purchaseModel == null) {
            return null;
        }
        return new PurchaseDTO(
                purchaseModel.getId(),
                purchaseModel.getName(),
                purchaseModel.getDescription(),
                purchaseModel.getFiscalNoteId(),
                purchaseModel.getManufacturerId(),
                purchaseModel.getNoteTypeId(),
                purchaseModel.getAmount(),
                purchaseModel.getPrice(),
                purchaseModel.getPurchaseDate(),
                purchaseModel.getDeliveryDate(),
                purchaseModel.getFile(),
                purchaseModel.getFileName()
        );
    }

    public PurchaseModel toEntity(PurchaseDTO purchaseDTO) {

        if (purchaseDTO == null) {
            return null;
        }

        PurchaseModel purchaseModel = new PurchaseModel();
        if (purchaseDTO.id() != null) {
            purchaseModel.setId(purchaseDTO.id());
        }
        purchaseModel.setName(purchaseDTO.name());
        purchaseModel.setAmount(purchaseDTO.amount());
        purchaseModel.setDeliveryDate(purchaseDTO.deliveryDate());
        purchaseModel.setDescription(purchaseDTO.description());
        purchaseModel.setFile(purchaseDTO.file());
        purchaseModel.setFileName(purchaseDTO.fileName());
        purchaseModel.setFiscalNoteId(purchaseDTO.fiscalNoteId());
        purchaseModel.setManufacturerId(purchaseDTO.manufacturerId());
        purchaseModel.setNoteTypeId(purchaseDTO.noteTypeId());
        purchaseModel.setPrice(purchaseDTO.price());
        purchaseModel.setPurchaseDate(purchaseDTO.purchaseDate());
        return purchaseModel;
    }

}
