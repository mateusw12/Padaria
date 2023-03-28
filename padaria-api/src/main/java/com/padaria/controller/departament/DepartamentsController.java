package com.padaria.controller.departament;

import com.padaria.dto.departament.DepartamentDTO;
import com.padaria.service.departament.DepartamentService;
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
@RequestMapping("/api/cadastro/departamento")
@Tag(name = "Cadastro de Departamento")
public class DepartamentsController {

    @Autowired
    private DepartamentService departamentService;

    @GetMapping()
    @Operation(summary = "Lista todas os departamentos")
    public List<DepartamentDTO> findAll() {
        return departamentService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um departamento por código")
    public ResponseEntity<DepartamentDTO> findById(@PathVariable @NotNull @Positive Long id) {
        DepartamentDTO departamentDTO = departamentService.findById(id);
        return ResponseEntity.ok().body(departamentDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra departamento")
    public DepartamentDTO create(@RequestBody @Valid DepartamentDTO departamentDTO) {
        return departamentService.create(departamentDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui departamento")
    public ResponseEntity<DepartamentDTO> delete(@PathVariable @NotNull @Positive Long id) {
        departamentService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza departamento")
    public DepartamentDTO update(@PathVariable() @NotNull @Positive Long id,
                                                 @RequestBody @Valid DepartamentDTO departamentDTO) {
        return departamentService.update(id, departamentDTO);
    }

}
