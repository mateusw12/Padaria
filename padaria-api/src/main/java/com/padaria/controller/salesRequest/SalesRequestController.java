package com.padaria.controller.salesRequest;

import com.padaria.dto.salesRequest.SalesRequestDTO;
import com.padaria.service.salesRequest.SalesRequestService;
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
@RequestMapping("/api/estoque/vendas")
@Tag(name = "Cadastro de Pedido de Venda")
public class SalesRequestController {

    @Autowired
    private SalesRequestService salesRequestService;

    @GetMapping()
    @Operation(summary = "Lista todas os pedidos de venda")
    public ResponseEntity<List<SalesRequestDTO>> findAll() {
        return salesRequestService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um pedido de venda por código")
    public ResponseEntity<SalesRequestDTO> findById(@PathVariable @NotNull @Positive Long id) {
        SalesRequestDTO salesRequestDTO = salesRequestService.findById(id);
        return ResponseEntity.ok().body(salesRequestDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra pedido de venda")
    public SalesRequestDTO create(@RequestBody @Valid SalesRequestDTO salesRequestDTO) {
        return salesRequestService.create(salesRequestDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui pedido de venda")
    public ResponseEntity<SalesRequestDTO> delete(@PathVariable @NotNull @Positive Long id) {
        if (id <= 0) {
            return ResponseEntity.notFound().build();
        }
        salesRequestService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza pedido de venda")
    public ResponseEntity<SalesRequestDTO> update(@PathVariable("id") @RequestBody @Valid SalesRequestDTO salesRequestDTO) {
        return salesRequestService.update(salesRequestDTO);
    }

}
