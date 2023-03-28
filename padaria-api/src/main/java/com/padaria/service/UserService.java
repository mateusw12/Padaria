package com.padaria.service;

import com.padaria.dto.user.UserDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.user.UserModel;
import com.padaria.repository.user.UserRepository;
import com.padaria.security.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springfox.documentation.annotations.Cacheable;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    private final PasswordEncoder encoder;

    public UserService(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Transactional
    public UserDTO findById(Long id) {
        UserModel userModel = userRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return userModel.convertEntityToDTO();
    }

    @Cacheable(value = "users")
    @Transactional
    public UserDTO findMe(String userName) {
        UserModel userModel = userRepository.findByUserName(userName);
        return userModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<UserDTO>> findALl() {
        List<UserModel> userModels = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();
        userModels.stream().forEach(t -> userDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<UserDTO>>(userDTOS, HttpStatus.OK);
    }

    @Transactional
    public UserDTO create(UserDTO userDTO) {
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        UserModel userModel = userRepository.save(userDTO.convertDTOToEntity());
        return userModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<UserDTO> delete(Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<UserDTO> update(UserDTO userDTO) {
        UserModel userModel = userRepository.findById(userDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + userDTO.getId())
        );

        UserDTO dto = userModel.convertEntityToDTO();
        dto.setName(userDTO.getName());
        dto.setEmail(userDTO.getEmail());
        dto.setUserName(userDTO.getUserName());
        dto.setRole(userDTO.getRole());
        dto.setIsActive(userDTO.getIsActive());
        dto.setIsDarkMode(userDTO.getIsDarkMode());
        dto.setPassword(encoder.encode(userDTO.getPassword()));
        userRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<UserDTO>(dto, HttpStatus.OK);
    }

}
