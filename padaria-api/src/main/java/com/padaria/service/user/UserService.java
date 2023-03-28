package com.padaria.service.user;

import com.padaria.dto.user.UserDTO;
import com.padaria.mapper.user.UserMapper;
import com.padaria.repository.user.UserRepository;
import com.padaria.security.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springfox.documentation.annotations.Cacheable;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public UserDTO findById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("User not found" + id));
    }

    @Cacheable(value = "users")
    @Transactional
    public UserDTO findMe(String userName) {
        return userMapper.toDTO(userRepository.findByUserName(userName));
    }

    @Transactional
    public List<UserDTO> findALl() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO create(UserDTO userDTO) {
        return userMapper.toDTO(userRepository.save(userMapper.toEntity(userDTO)));
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found" + id)));
    }

    @Transactional
    public UserDTO update(Long id, UserDTO userDTO) {
        return userRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(userDTO.name());
                    recordFound.setEmail(userDTO.email());
                    recordFound.setUserName(userDTO.userName());
                    recordFound.setRole(userDTO.role());
                    recordFound.setIsActive(userDTO.isActive());
                    recordFound.setIsDarkMode(userDTO.isDarkMode());
                    recordFound.setPassword(encoder.encode(userDTO.password()));
                    return userMapper.toDTO(userRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("User not found" + id));
    }

}
