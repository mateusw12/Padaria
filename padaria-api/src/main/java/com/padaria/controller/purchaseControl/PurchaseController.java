package com.padaria.controller.purchaseControl;

import com.padaria.dto.purchaseControl.PurchaseDTO;
import com.padaria.service.purchaseControl.PurchaseService;
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
@RequestMapping("/api/controle-compras")
@Tag(name = "Contrle de Compras")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @GetMapping()
    @Operation(summary = "Lista todas as compras")
    public List<PurchaseDTO> findAll() {
        return purchaseService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente uma compras por código")
    public ResponseEntity<PurchaseDTO> findById(@PathVariable @NotNull @Positive Long id) {
        PurchaseDTO purchaseDTO = purchaseService.findById(id);
        return ResponseEntity.ok().body(purchaseDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra compras")
    public PurchaseDTO create(@RequestBody @Valid PurchaseDTO purchaseDTO) {
        return purchaseService.create(purchaseDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui compras")
    public ResponseEntity<PurchaseDTO> delete(@PathVariable @NotNull @Positive Long id) {
        purchaseService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza compras")
    public PurchaseDTO update(@PathVariable @NotNull @Positive Long id,
                              @RequestBody @Valid PurchaseDTO purchaseDTO) {
        return purchaseService.update(id, purchaseDTO);
    }

}
