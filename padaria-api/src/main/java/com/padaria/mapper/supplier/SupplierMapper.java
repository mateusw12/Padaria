package com.padaria.mapper.supplier;

import com.padaria.dto.supplier.SupplierDTO;
import com.padaria.model.supplier.SupplierModel;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {

    public SupplierDTO toDTO(SupplierModel supplierModel) {
        if (supplierModel == null) {
            return null;
        }
        return new SupplierDTO(
                supplierModel.getId(),
                supplierModel.getName(),
                supplierModel.getComercialName(),
                supplierModel.getCnpj(),
                supplierModel.getPhone(),
                supplierModel.getZipCodeAddresses(),
                supplierModel.getPhone(),
                supplierModel.getState(),
                supplierModel.getDistrict(),
                supplierModel.getCity(),
                supplierModel.getEmail()
        );
    }

    public SupplierModel toEntity(SupplierDTO supplierDTO) {

        if (supplierDTO == null) {
            return null;
        }

        SupplierModel supplierModel = new SupplierModel();
        if (supplierDTO.id() != null) {
            supplierModel.setId(supplierDTO.id());
        }
        supplierModel.setName(supplierDTO.name());
        supplierModel.setEmail(supplierDTO.email());
        supplierModel.setCity(supplierDTO.city());
        supplierModel.setCnpj(supplierDTO.cnpj());
        supplierModel.setComercialName(supplierDTO.comercialName());
        supplierModel.setDistrict(supplierDTO.district());
        supplierModel.setPhone(supplierDTO.phone());
        supplierModel.setState(supplierDTO.state());
        supplierModel.setStreet(supplierDTO.street());
        supplierModel.setZipCodeAddresses(supplierDTO.zipCodeAddresses());
        return supplierModel;
    }

}
