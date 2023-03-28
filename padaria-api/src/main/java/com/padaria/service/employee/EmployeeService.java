package com.padaria.service.employee;

import com.padaria.dto.employee.EmployeeDTO;
import com.padaria.mapper.employee.EmployeeMapper;
import com.padaria.repository.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Transactional
    public EmployeeDTO findById(Long id) {
        return employeeRepository.findById(id).map(employeeMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found" + id));
    }

    @Transactional
    public List<EmployeeDTO> findALl() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmployeeDTO create(EmployeeDTO employeeDTO) {
        return employeeMapper.toDTO(employeeRepository.save(employeeMapper.toEntity(employeeDTO)));
    }

    @Transactional
    public void delete(Long id) {
        employeeRepository.delete(employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found" + id)));
    }

    @Transactional
    public EmployeeDTO update(Long id, EmployeeDTO employeeDTO) {
        return employeeRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(employeeDTO.name());
                    recordFound.setAdmissionDate(employeeDTO.admissionDate());
                    recordFound.setCity(employeeDTO.city());
                    recordFound.setBirthDate(employeeDTO.birthDate());
                    recordFound.setCpf(employeeDTO.cpf());
                    recordFound.setDistrict(employeeDTO.district());
                    recordFound.setEmail(employeeDTO.email());
                    recordFound.setHourlyWork(employeeDTO.hourlyWork());
                    recordFound.setJobId(employeeDTO.jobId());
                    recordFound.setState(employeeDTO.state());
                    recordFound.setStreet(employeeDTO.street());
                    recordFound.setWorkingHours(employeeDTO.workingHours());
                    recordFound.setZipCodeAddresses(employeeDTO.zipCodeAddresses());
                    return employeeMapper.toDTO(employeeRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Employee not found" + id));
    }

}
