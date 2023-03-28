package com.padaria.mapper.buyRequest;

import com.padaria.dto.buyRequest.BuyRequestDTO;
import com.padaria.model.buyRequest.BuyRequestModel;
import org.springframework.stereotype.Component;

@Component
public class BuyRequestMapper {

    public BuyRequestDTO toDTO(BuyRequestModel buyRequestModel) {
        if (buyRequestModel == null) {
            return null;
        }
        return new BuyRequestDTO(
                buyRequestModel.getItemId(),
                buyRequestModel.getRequestId(),
                buyRequestModel.getObservation(),
                buyRequestModel.getAmount(),
                buyRequestModel.getNoteTypeId(),
                buyRequestModel.getProductId(),
                buyRequestModel.getEmployeeId(),
                buyRequestModel.getSupplierId(),
                buyRequestModel.getTotalValue(),
                buyRequestModel.getIssueDate(),
                buyRequestModel.getDeliveryDate(),
                buyRequestModel.getPaymentCondition()
        );
    }

    public BuyRequestModel toEntity(BuyRequestDTO buyRequestDTO) {

        if (buyRequestDTO == null) {
            return null;
        }

        BuyRequestModel buyRequestModel = new BuyRequestModel();
        if (buyRequestDTO.itemId() != null) {
            buyRequestModel.setItemId(buyRequestDTO.itemId());
        }
        buyRequestModel.setAmount(buyRequestDTO.amount());
        buyRequestModel.setDeliveryDate(buyRequestDTO.deliveryDate());
        buyRequestModel.setEmployeeId(buyRequestDTO.employeeId());
        buyRequestModel.setIssueDate(buyRequestDTO.issueDate());
        buyRequestModel.setNoteTypeId(buyRequestDTO.noteTypeId());
        buyRequestModel.setObservation(buyRequestDTO.observation());
        buyRequestModel.setPaymentCondition(buyRequestDTO.paymentCondition());
        buyRequestModel.setProductId(buyRequestDTO.productId());
        buyRequestModel.setRequestId(buyRequestDTO.requestId());
        buyRequestModel.setSupplierId(buyRequestDTO.supplierId());
        buyRequestModel.setTotalValue(buyRequestDTO.totalValue());
        return buyRequestModel;
    }

}
