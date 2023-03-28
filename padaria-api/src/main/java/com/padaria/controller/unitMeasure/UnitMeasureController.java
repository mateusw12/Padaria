package com.padaria.controller.unitMeasure;

import com.padaria.dto.unitMeasure.UnitMeasureDTO;
import com.padaria.service.unitMeasure.UnitMeasureService;
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
@RequestMapping("/api/cadastro/unidade-medida")
@Tag(name = "Cadastro de Unidade de Medida")
public class UnitMeasureController {

    @Autowired
    private UnitMeasureService unitMeasureService;

    @GetMapping()
    @Operation(summary = "Lista todas as unidades de medida")
    public ResponseEntity<List<UnitMeasureDTO>> findAll() {
        return unitMeasureService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente uma unidades de medida por código")
    public ResponseEntity<UnitMeasureDTO> findById(@PathVariable @NotNull @Positive Long id) {
        UnitMeasureDTO unitMeasureDTO = unitMeasureService.findById(id);
        return ResponseEntity.ok().body(unitMeasureDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra unidade de medida")
    public UnitMeasureDTO create(@RequestBody @Valid UnitMeasureDTO unitMeasureDTO) {
        return unitMeasureService.create(unitMeasureDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui unidade de medida")
    public ResponseEntity<UnitMeasureDTO> delete(@PathVariable @NotNull @Positive Long id) {
        unitMeasureService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza unidade de medida")
    public ResponseEntity<UnitMeasureDTO> update(@PathVariable("id") @RequestBody @Valid UnitMeasureDTO unitMeasureDTO) {
        return unitMeasureService.update(unitMeasureDTO);
    }

}
