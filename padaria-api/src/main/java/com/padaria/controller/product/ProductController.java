package com.padaria.controller.product;

import com.padaria.dto.product.ProductDTO;
import com.padaria.service.product.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/cadastro/produto")
@Tag(name = "Cadastro de Produto")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping()
    @Operation(summary = "Lista todos os produtos")
    public List<ProductDTO> findAll() {
        return productService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um produto por código")
    public ResponseEntity<ProductDTO> findById(@PathVariable @NotNull @Positive Long id) {
        ProductDTO productDTO = productService.findById(id);
        return ResponseEntity.ok().body(productDTO);
    }

    @PostMapping(value = "/bar-code")
    @Operation(summary = "Lista todos os produto por código de barra")
    public ProductDTO findBYBarCode(@RequestBody @NotBlank String barCode) {
        return productService.findByBarCode(barCode);
    }

    @PostMapping
    @Operation(summary = "Cadastra produto")
    public ProductDTO create(@RequestBody @Valid ProductDTO productDTO) {
        return productService.create(productDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui produto")
    public ResponseEntity<ProductDTO> delete(@PathVariable @NotNull @Positive Long id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza produto")
    public ProductDTO update(@PathVariable @NotNull @Positive Long id,
                             @RequestBody @Valid ProductDTO productDTO) {
        return productService.update(id, productDTO);
    }

}
