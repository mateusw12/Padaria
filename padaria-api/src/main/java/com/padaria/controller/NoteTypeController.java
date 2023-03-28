package com.padaria.controller;

import com.padaria.dto.noteType.NoteTypeDTO;
import com.padaria.service.NoteTypeService;
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
@RequestMapping("/api/cadastro/tipo-nota")
@Tag(name = "Cadastro de Tipo Nota")
public class NoteTypeController {

    @Autowired
    private NoteTypeService noteTypeService;

    @GetMapping()
    @Operation(summary = "Lista todos os tipos de nota")
    public ResponseEntity<List<NoteTypeDTO>> findAll() {
        return noteTypeService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um tipos de nota por código")
    public ResponseEntity<NoteTypeDTO> findById(@PathVariable @NotNull @Positive Long id) {
        NoteTypeDTO noteTypeDTO = noteTypeService.findById(id);
        return ResponseEntity.ok().body(noteTypeDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra tipo de nota")
    public NoteTypeDTO create(@RequestBody @Valid NoteTypeDTO noteTypeDTO) {
        return noteTypeService.create(noteTypeDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui tipo de nota")
    public ResponseEntity<NoteTypeDTO> delete(@PathVariable @NotNull @Positive Long id) {
        noteTypeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza tipo de nota")
    public ResponseEntity<NoteTypeDTO> update(@PathVariable Long id, @RequestBody @Valid NoteTypeDTO noteTypeDTO) {
        if (id != noteTypeDTO.getId()) {
            return ResponseEntity.notFound().build();
        }
        return noteTypeService.update(noteTypeDTO);
    }

}
