package com.padaria.dto;

import java.util.Date;
import java.util.List;

public record EmployeeQueryFilterDTO(
        List<Long> employeeIds,
        List<Long> gender,
        List<Long> maritalStatus,
        List<Long> levelSchooling,
        Date admissionDate,
        List<Long> jobIds,
        String city,
        List<String> states
) {

}
