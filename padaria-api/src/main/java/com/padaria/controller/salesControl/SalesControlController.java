package com.padaria.controller.salesControl;

import com.padaria.dto.salesControl.SalesControlDTO;
import com.padaria.dto.salesControl.SalesControlFilterDTO;
import com.padaria.service.salesControl.SalesControlService;
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
@RequestMapping("/api/controle-venda")
@Tag(name = "Controle de Venda")
public class SalesControlController {

    @Autowired
    private SalesControlService salesControlService;

    @PostMapping(value = "/filter")
    @Operation(summary = "Lista todas as vendas")
    public ResponseEntity<List<SalesControlDTO>> find(SalesControlFilterDTO salesControlFilterDTO) {
        return salesControlService.find(salesControlFilterDTO);
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente uma venda por código")
    public ResponseEntity<SalesControlDTO> findById(@PathVariable @NotNull @Positive Long id) {
        SalesControlDTO salesControlDTO = salesControlService.findById(id);
        return ResponseEntity.ok().body(salesControlDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra venda")
    public ResponseEntity<SalesControlDTO> create(@RequestBody @Valid List<SalesControlDTO> salesControlDTOS) {
        return salesControlService.create(salesControlDTOS);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui venda")
    public ResponseEntity<SalesControlDTO> delete(@PathVariable @NotNull @Positive Long id) {
        salesControlService.delete(id);
        return ResponseEntity.ok().build();
    }

}
