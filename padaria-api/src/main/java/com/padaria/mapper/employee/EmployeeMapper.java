package com.padaria.mapper.employee;

import com.padaria.dto.employee.EmployeeDTO;
import com.padaria.model.employee.EmployeeModel;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public EmployeeDTO toDTO(EmployeeModel employeeModel) {
        if (employeeModel == null) {
            return null;
        }
        return new EmployeeDTO(
                employeeModel.getId(),
                employeeModel.getName(),
                employeeModel.getAdmissionDate(),
                employeeModel.getBirthDate(),
                employeeModel.getCity(),
                employeeModel.getStreet(),
                employeeModel.getDistrict(),
                employeeModel.getState(),
                employeeModel.getEmail(),
                employeeModel.getHourlyWork(),
                employeeModel.getJobId(),
                employeeModel.getPhone(),
                employeeModel.getWorkingHours(),
                employeeModel.getZipCodeAddresses(),
                employeeModel.getCpf(),
                employeeModel.getMaritalStatus(),
                employeeModel.getGender(),
                employeeModel.getLevelSchooling()
        );
    }

    public EmployeeModel toEntity(EmployeeDTO employeeDTO) {

        if (employeeDTO == null) {
            return null;
        }

        EmployeeModel employeeModel = new EmployeeModel();
        if (employeeDTO.id() != null) {
            employeeModel.setId(employeeDTO.id());
        }
        employeeModel.setName(employeeDTO.name());
        employeeModel.setDistrict(employeeDTO.name());
        employeeModel.setEmail(employeeDTO.email());
        employeeModel.setGender(employeeDTO.gender());
        employeeModel.setHourlyWork(employeeDTO.hourlyWork());
        employeeModel.setJobId(employeeDTO.jobId());
        employeeModel.setLevelSchooling(employeeDTO.levelSchooling());
        employeeModel.setMaritalStatus(employeeDTO.maritalStatus());
        employeeModel.setPhone(employeeDTO.phone());
        employeeModel.setState(employeeDTO.state());
        employeeModel.setStreet(employeeDTO.street());
        employeeModel.setWorkingHours(employeeDTO.workingHours());
        employeeModel.setZipCodeAddresses(employeeDTO.zipCodeAddresses());
        return employeeModel;
    }

}
