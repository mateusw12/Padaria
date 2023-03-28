package com.padaria.controller;

import com.padaria.dto.productQuery.ProductQueryFilterDTO;
import com.padaria.model.product.ProductModel;
import com.padaria.service.ProductQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consulta/produto")
@Tag(name = "Consulta de Produtos")
public class ProductQueryController {

    @Autowired
    private ProductQueryService productQueryService;

    @PostMapping()
    @Operation(summary = "Lita todos os produtos por filtro")
    public ResponseEntity<List<ProductModel>> find(@RequestBody ProductQueryFilterDTO filterDTO) {
        return productQueryService.find(filterDTO);
    }

}
