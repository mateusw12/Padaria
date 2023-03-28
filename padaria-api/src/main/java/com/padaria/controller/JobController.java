package com.padaria.controller;

import com.padaria.dto.BrandDTO;
import com.padaria.dto.JobDTO;
import com.padaria.service.JobService;
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
@RequestMapping("/api/cadastro/cargo")
@Tag(name = "Cadastro de Cargo")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping()
    @Operation(summary = "Lista todos os cargos")
    public ResponseEntity<List<JobDTO>> findAll() {
        return jobService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um cargo por código")
    public ResponseEntity<JobDTO> findById(@PathVariable @NotNull @Positive Long id) {
        JobDTO jobDTO = jobService.findById(id);
        return ResponseEntity.ok().body(jobDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastro de cargo")
    public JobDTO create(@RequestBody @Valid JobDTO jobDTO) {
        return jobService.create(jobDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui cargo")
    public ResponseEntity<BrandDTO> delete(@PathVariable @NotNull @Positive Long id) {
        jobService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza cargo")
    public ResponseEntity<JobDTO> update(@PathVariable("id") @RequestBody @Valid JobDTO jobDTO) {
        return jobService.update(jobDTO);
    }

}