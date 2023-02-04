package com.padaria.controller;

import com.padaria.dto.SupplierDTO;
import com.padaria.service.SupplierService;
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
@RequestMapping("/api/cadastro/fornecedor")
@Tag(name = "Cadastro de Fornecedor")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping()
    @Operation(summary = "Lista todos os fornecedores")
    public ResponseEntity<List<SupplierDTO>> findAll() {
        return supplierService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um fornecedor por código")
    public ResponseEntity<SupplierDTO> findById(@PathVariable @NotNull @Positive Long id) {
        SupplierDTO supplierDTO = supplierService.findById(id);
        return ResponseEntity.ok().body(supplierDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra fornecedor")
    public SupplierDTO create(@RequestBody @Valid SupplierDTO supplierDTO) {
        return supplierService.create(supplierDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui fornecedor")
    public ResponseEntity<SupplierDTO> delete(@PathVariable @NotNull @Positive Long id) {
        supplierService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza fornecedor")
    public ResponseEntity<SupplierDTO> update(@PathVariable("id") @RequestBody @Valid SupplierDTO supplierDTO) {
        return supplierService.update(supplierDTO);
    }

}
