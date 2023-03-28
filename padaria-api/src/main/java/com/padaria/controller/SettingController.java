package com.padaria.controller;

import com.padaria.dto.settings.SettingDTO;
import com.padaria.service.SettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/configuracao")
@Tag(name = "Configuração")
public class
SettingController {

    @Autowired
    private SettingService settingService;

    @GetMapping()
    @Operation(summary = "Lista somente uma configuração")
    public ResponseEntity<SettingDTO> findAll() {
        SettingDTO settingDTO = settingService.findAll();
        return ResponseEntity.ok().body(settingDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra configuração")
    public SettingDTO create(@RequestBody @Valid SettingDTO settingDTO) {
        return settingService.create(settingDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui configuração")
    public ResponseEntity<SettingDTO> delete(@PathVariable @NotNull @Positive Long id) {
        settingService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza configuração")
    public ResponseEntity<SettingDTO> update(@PathVariable("id") @RequestBody @Valid SettingDTO settingDTO) {
        return settingService.update(settingDTO);
    }

}
