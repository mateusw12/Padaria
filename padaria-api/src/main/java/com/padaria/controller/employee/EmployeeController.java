package com.padaria.controller.employee;

import com.padaria.dto.employee.EmployeeDTO;
import com.padaria.service.employee.EmployeeService;
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
@RequestMapping("/api/cadastro/funcionario")
@Tag(name = "Cadastro de Funcionário")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    @Operation(summary = "Lista todos os funcionários")
    public List<EmployeeDTO> findAll() {
        return employeeService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um funcionários por código")
    public ResponseEntity<EmployeeDTO> findById(@PathVariable @NotNull @Positive Long id) {
        EmployeeDTO employeeDTO = employeeService.findById(id);
        return ResponseEntity.ok().body(employeeDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra funcionário")
    public EmployeeDTO create(@RequestBody @Valid EmployeeDTO employeeDTO) {
        return employeeService.create(employeeDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui funcionário")
    public ResponseEntity<EmployeeDTO> delete(@PathVariable @NotNull @Positive Long id) {
        employeeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza funcionário")
    public EmployeeDTO update(@PathVariable @NotNull @Positive Long id,
                              @RequestBody @Valid EmployeeDTO employeeDTO) {
        return employeeService.update(id, employeeDTO);
    }

}
