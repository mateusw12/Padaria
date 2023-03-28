package com.padaria.mapper.salesControl;

import com.padaria.dto.salesControl.SalesControlDTO;
import com.padaria.model.salesControl.SalesControlModel;
import org.springframework.stereotype.Component;

@Component
public class SalesControlMapper {

    public SalesControlDTO toDTO(SalesControlModel salesControlModel) {
        if (salesControlModel == null) {
            return null;
        }
        return new SalesControlDTO(
                salesControlModel.getId(),
                salesControlModel.getProductId(),
                salesControlModel.getBrandId(),
                salesControlModel.getAmount(),
                salesControlModel.getTotalValue(),
                salesControlModel.getRegistrationDate(),
                salesControlModel.getUserSales()
        );
    }

    public SalesControlModel toEntity(SalesControlDTO salesControlDTO) {

        if (salesControlDTO == null) {
            return null;
        }

        SalesControlModel salesControlModel = new SalesControlModel();
        if (salesControlDTO.id() != null) {
            salesControlModel.setId(salesControlDTO.id());
        }
        salesControlModel.setAmount(salesControlDTO.amount());
        salesControlModel.setBrandId(salesControlDTO.brandId());
        salesControlModel.setProductId(salesControlDTO.productId());
        salesControlModel.setRegistrationDate(salesControlDTO.registrationDate());
        salesControlModel.setTotalValue(salesControlDTO.totalValue());
        salesControlModel.setUserSales(salesControlDTO.userSales());
        return salesControlModel;
    }

}
