package com.padaria.mapper.product;

import com.padaria.dto.product.ProductDTO;
import com.padaria.model.product.ProductModel;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDTO toDTO(ProductModel productModel) {
        if (productModel == null) {
            return null;
        }
        return new ProductDTO(
                productModel.getId(),
                productModel.getName(),
                productModel.getDescription(),
                productModel.getGroupedCodes(),
                productModel.getUnitMeasureId(),
                productModel.getBrandId(),
                productModel.getManufacturerId(),
                productModel.getUnitaryPrice(),
                productModel.getAmount(),
                productModel.getBarCode()
        );
    }

    public ProductModel toEntity(ProductDTO productDTO) {

        if (productDTO == null) {
            return null;
        }

        ProductModel productModel = new ProductModel();
        if (productDTO.id() != null) {
            productModel.setId(productDTO.id());
        }
        productModel.setName(productDTO.name());
        productModel.setAmount(productDTO.amount());
        productModel.setBarCode(productDTO.barCode());
        productModel.setBrandId(productDTO.brandId());
        productModel.setDescription(productDTO.description());
        productModel.setGroupedCodes(productDTO.groupedCodes());
        productModel.setManufacturerId(productDTO.manufacturerId());
        productModel.setUnitaryPrice(productDTO.unitaryPrice());
        productModel.setUnitMeasureId(productDTO.unitMeasureId());
        return productModel;
    }

}
