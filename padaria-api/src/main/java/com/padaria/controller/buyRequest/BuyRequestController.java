package com.padaria.controller.buyRequest;

import com.padaria.dto.buyRequest.BuyRequestDTO;
import com.padaria.service.buyRequest.BuyRequestService;
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
@RequestMapping("/api/estoque/compra")
@Tag(name = "Cadastro de Pedido de Compra")
public class BuyRequestController {

    @Autowired
    private BuyRequestService buyRequestService;

    @GetMapping()
    @Operation(summary = "Lista todas os pedidos de compra")
    public ResponseEntity<List<BuyRequestDTO>> findAll() {
        return buyRequestService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um pedido de compra por código")
    public ResponseEntity<BuyRequestDTO> findById(@PathVariable @NotNull @Positive Long id) {
        BuyRequestDTO brandDTO = buyRequestService.findById(id);
        return ResponseEntity.ok().body(brandDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra pedido de compra")
    public BuyRequestDTO create(@RequestBody @Valid BuyRequestDTO buyRequestDTO) {
        return buyRequestService.create(buyRequestDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui pedido de compra")
    public ResponseEntity<BuyRequestDTO> delete(@PathVariable @NotNull @Positive Long id) {
        if (id <= 0) {
            return ResponseEntity.notFound().build();
        }
        buyRequestService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza pedido de compra")
    public ResponseEntity<BuyRequestDTO> update(@PathVariable("id") @RequestBody @Valid BuyRequestDTO buyRequestDTO) {
        return buyRequestService.update(buyRequestDTO);
    }

}
