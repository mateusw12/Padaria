package com.padaria.controller;

import com.padaria.dto.inventory.InventoryDTO;
import com.padaria.service.InventoryService;
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
@RequestMapping("/api/estoque")
@Tag(name = "Controle de Estoque")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping()
    @Operation(summary = "Lista todos os estoque")
    public ResponseEntity<List<InventoryDTO>> findAll() {
        return inventoryService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um estoque por código")
    public ResponseEntity<InventoryDTO> findById(@PathVariable @NotNull @Positive Long id) {
        InventoryDTO inventoryDTO = inventoryService.findById(id);
        return ResponseEntity.ok().body(inventoryDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra estoque")
    public InventoryDTO create(@RequestBody @Valid InventoryDTO inventoryDTO) {
        return inventoryService.create(inventoryDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui estoque")
    public ResponseEntity<InventoryDTO> delete(@PathVariable @NotNull @Positive Long id) {
        inventoryService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza estoque")
    public ResponseEntity<InventoryDTO> update(@PathVariable("id") @RequestBody @Valid InventoryDTO inventoryDTO) {
        return inventoryService.update(inventoryDTO);
    }

}
