package com.padaria.controller.user;

import com.padaria.dto.user.UserDTO;
import com.padaria.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/cadastro/usuario")
@Tag(name = "Cadastro de Usuário")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    @Operation(summary = "Lista todas os usuários")
    public ResponseEntity<List<UserDTO>> findAll() {
        return userService.findALl();
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Lista somente um usuário por código")
    public ResponseEntity<UserDTO> findById(@PathVariable @NotNull @Positive Long id) {
        UserDTO userDTO = userService.findById(id);
        return ResponseEntity.ok().body(userDTO);
    }

    @GetMapping(value = "/me/{user}")
    @Operation(summary = "Lista somente um usuário logado")
    public ResponseEntity<UserDTO> findMe(@PathVariable @NotBlank String user) {
        UserDTO userDTO = userService.findMe(user);
        return ResponseEntity.ok().body(userDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra usuário")
    public UserDTO create(@RequestBody @Valid UserDTO userDTO) {
        return userService.create(userDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui usuário")
    public ResponseEntity<UserDTO> delete(@PathVariable @NotNull @Positive Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza usuário")
    public ResponseEntity<UserDTO> update(@PathVariable("id") @RequestBody @Valid UserDTO userDTO) {
        return userService.update(userDTO);
    }

}
