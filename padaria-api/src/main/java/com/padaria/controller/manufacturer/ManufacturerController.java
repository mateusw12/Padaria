package com.padaria.controller.manufacturer;

import com.padaria.dto.manufacturer.ManufacturerDTO;
import com.padaria.service.manufacturer.ManufacturerService;
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
@RequestMapping("/api/cadastro/fabricante")
@Tag(name = "Cadastro de Fabricante")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @GetMapping()
    @Operation(summary = "Lista todos os fabricantes")
    public ResponseEntity<List<ManufacturerDTO>> findAll() {
        return manufacturerService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um fabricante por código")
    public ResponseEntity<ManufacturerDTO> findById(@PathVariable @NotNull @Positive Long id) {
        ManufacturerDTO manufacturerDTO = manufacturerService.findById(id);
        return ResponseEntity.ok().body(manufacturerDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra fabricante")
    public ManufacturerDTO create(@RequestBody @Valid ManufacturerDTO manufacturerDTO) {
        return manufacturerService.create(manufacturerDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui fabricante")
    public ResponseEntity<ManufacturerDTO> delete(@PathVariable @NotNull @Positive Long id) {
        manufacturerService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza fabricante")
    public ResponseEntity<ManufacturerDTO> update(@PathVariable("id") @RequestBody @Valid ManufacturerDTO manufacturerDTO) {
        return manufacturerService.update(manufacturerDTO);
    }

}
