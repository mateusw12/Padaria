package com.padaria.mapper.salesRequest;

import com.padaria.dto.salesRequest.SalesRequestDTO;
import com.padaria.model.salesRequest.SalesRequestModel;
import org.springframework.stereotype.Component;

@Component
public class SalesRequestMapper {

    public SalesRequestDTO toDTO(SalesRequestModel salesRequestModel) {
        if (salesRequestModel == null) {
            return null;
        }
        return new SalesRequestDTO(
                salesRequestModel.getItemId(),
                salesRequestModel.getRequestId(),
                salesRequestModel.getObservation(),
                salesRequestModel.getAmount(),
                salesRequestModel.getNoteTypeId(),
                salesRequestModel.getProductId(),
                salesRequestModel.getEmployeeId(),
                salesRequestModel.getSupplierId(),
                salesRequestModel.getTotalValue(),
                salesRequestModel.getPaymentCondition()
        );
    }

    public SalesRequestModel toEntity(SalesRequestDTO salesRequestDTO) {

        if (salesRequestDTO == null) {
            return null;
        }

        SalesRequestModel salesRequestModel = new SalesRequestModel();
        if (salesRequestDTO.itemId() != null) {
            salesRequestModel.setItemId(salesRequestDTO.itemId());
        }
        salesRequestModel.setAmount(salesRequestDTO.amount());
        salesRequestModel.setEmployeeId(salesRequestDTO.employeeId());
        salesRequestModel.setNoteTypeId(salesRequestDTO.noteTypeId());
        salesRequestModel.setObservation(salesRequestDTO.observation());
        salesRequestModel.setPaymentCondition(salesRequestDTO.paymentCondition());
        salesRequestModel.setProductId(salesRequestDTO.productId());
        salesRequestModel.setRequestId(salesRequestDTO.requestId());
        salesRequestModel.setSupplierId(salesRequestDTO.supplierId());
        salesRequestModel.setTotalValue(salesRequestDTO.totalValue());
        return salesRequestModel;
    }

}
