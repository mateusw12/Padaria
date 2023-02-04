package com.padaria.service;

import com.padaria.dto.EmployeeDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.EmployeeModel;
import com.padaria.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public EmployeeDTO findById(Long id) {
        EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return employeeModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<EmployeeDTO>> findALl() {
        List<EmployeeModel> employeeModels = employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOS = new ArrayList<>();
        employeeModels.stream().forEach(t -> employeeDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<EmployeeDTO>>(employeeDTOS, HttpStatus.OK);
    }

    @Transactional
    public EmployeeDTO create(EmployeeDTO employeeDTO) {
        EmployeeModel employeeModel = employeeRepository.save(employeeDTO.convertDTOToEntity());
        return employeeModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<EmployeeDTO> delete(Long id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<EmployeeDTO> update(EmployeeDTO employeeDTO) {
        EmployeeModel employeeModel = employeeRepository.findById(employeeDTO.getId()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + employeeDTO.getId())
        );

        EmployeeDTO dto = employeeModel.convertEntityToDTO();
        dto.setName(employeeDTO.getName());
        dto.setAdmissionDate(employeeDTO.getAdmissionDate());
        dto.setCity(employeeDTO.getCity());
        dto.setBirthDate(employeeDTO.getBirthDate());
        dto.setCpf(employeeDTO.getCpf());
        dto.setDistrict(employeeDTO.getDistrict());
        dto.setEmail(employeeDTO.getEmail());
        dto.setHourlyWork(employeeDTO.getHourlyWork());
        dto.setJobId(employeeDTO.getJobId());
        dto.setState(employeeDTO.getState());
        dto.setStreet(employeeDTO.getStreet());
        dto.setWorkingHours(employeeDTO.getWorkingHours());
        dto.setZipCodeAddresses(employeeDTO.getZipCodeAddresses());
        employeeRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<EmployeeDTO>(dto, HttpStatus.OK);
    }

}
