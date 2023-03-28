package com.padaria.mapper.inventory;

import com.padaria.dto.inventory.InventoryDTO;
import com.padaria.model.inventory.InventoryModel;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public InventoryDTO toDTO(InventoryModel inventoryModel) {
        if (inventoryModel == null) {
            return null;
        }
        return new InventoryDTO(
                inventoryModel.getItemId(),
                inventoryModel.getItemDescription(),
                inventoryModel.getRequestId(),
                inventoryModel.getFiscalNoteId(),
                inventoryModel.getProductId()
        );
    }

    public InventoryModel toEntity(InventoryDTO inventoryDTO) {

        if (inventoryDTO == null) {
            return null;
        }

        InventoryModel inventoryModel = new InventoryModel();
        if (inventoryDTO.itemId() != null) {
            inventoryModel.setItemId(inventoryDTO.itemId());
        }
        inventoryModel.setFiscalNoteId(inventoryDTO.fiscalNoteId());
        inventoryModel.setItemDescription(inventoryDTO.itemDescription());
        inventoryModel.setProductId(inventoryDTO.productId());
        inventoryModel.setRequestId(inventoryDTO.requestId());
        return inventoryModel;
    }

}
