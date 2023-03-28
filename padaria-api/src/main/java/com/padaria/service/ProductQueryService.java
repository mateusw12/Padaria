package com.padaria.service;

import com.padaria.dto.productQuery.ProductQueryFilterDTO;
import com.padaria.model.product.ProductModel;
import com.padaria.repository.impl.ProductQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductQueryService {

    @Autowired
    private ProductQueryRepository productQueryRepository;

    @Transactional
    public ResponseEntity<List<ProductModel>> find(ProductQueryFilterDTO filterDTO) {
        List<ProductModel> productQueryDTOS = productQueryRepository.find(filterDTO);
        return new ResponseEntity<List<ProductModel>>(productQueryDTOS, HttpStatus.OK);
    }

}
