package com.padaria.controller.brand;

import com.padaria.dto.brand.BrandDTO;
import com.padaria.service.brand.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/cadastro/marca")
@Tag(name = "Cadastro de Marca")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping()
    @Operation(summary = "Lista todas as marcas")
    public ResponseEntity<List<BrandDTO>> findAll() {
        return brandService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente uma marca por código")
    public ResponseEntity<BrandDTO> findById(@PathVariable @NotNull @Positive Long id) {
        BrandDTO brandDTO = brandService.findById(id);
        return ResponseEntity.ok().body(brandDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra marca")
    public BrandDTO create(@RequestBody @Valid BrandDTO brandDTO) {
        return brandService.create(brandDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui marca")
    public ResponseEntity<BrandDTO> delete(@PathVariable @NotNull @Positive Long id) {
        brandService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza marca")
    public ResponseEntity<BrandDTO> update(@PathVariable("id") @RequestBody @Valid BrandDTO brandDTO) {
        return brandService.update(brandDTO);
    }

}
