package com.padaria.controller;

import com.padaria.dto.EmployeeQueryFilterDTO;
import com.padaria.model.employee.EmployeeModel;
import com.padaria.service.EmployeeQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consulta/funcionario")
@Tag(name = "Consulta de Funcionários")
public class EmployeeQueryController {

    @Autowired
    private EmployeeQueryService employeeQueryService;

    @PostMapping()
    @Operation(summary = "Lita todos os funcionários por filtro")
    public ResponseEntity<List<EmployeeModel>> find(@RequestBody EmployeeQueryFilterDTO filterDTO) {
        return employeeQueryService.find(filterDTO);
    }

}
