package com.padaria.service;

import com.padaria.dto.product.ProductDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.product.ProductModel;
import com.padaria.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springfox.documentation.annotations.Cacheable;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductDTO findById(Long id) {
        ProductModel productModel = productRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return productModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<ProductDTO>> findALl() {
        List<ProductModel> productModels = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        productModels.stream().forEach(t -> productDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<ProductDTO>>(productDTOS, HttpStatus.OK);
    }

    @Cacheable(value = "barCodes")
    @Transactional
    public ResponseEntity<ProductDTO> findByBarCode(String barCorde) {
        ProductModel productModel = productRepository.findByBarCode(barCorde);
        return new ResponseEntity<ProductDTO>(productModel.convertEntityToDTO(), HttpStatus.OK);
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO){
        ProductModel productModel=  productRepository.save(productDTO.convertDTOToEntity());
        return productModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<ProductDTO> delete(Long id){
        productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<ProductDTO> update(ProductDTO productDTO) {
        ProductModel productModel = productRepository.findById(productDTO.getId()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + productDTO.getId())
        );

        ProductDTO dto = productModel.convertEntityToDTO();
        dto.setName(productDTO.getName());
        dto.setDescription(productDTO.getDescription());
        dto.setBrandId(productDTO.getBrandId());
        dto.setGroupedCodes(productDTO.getGroupedCodes());
        dto.setManufacturerId(productDTO.getManufacturerId());
        dto.setUnitaryPrice(productDTO.getUnitaryPrice());
        dto.setUnitMeasureId(productDTO.getUnitMeasureId());
        dto.setBarCode(productDTO.getBarCode());
        productRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<ProductDTO>(dto, HttpStatus.OK);
    }

}
