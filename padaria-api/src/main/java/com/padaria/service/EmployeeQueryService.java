package com.padaria.service;

import com.padaria.dto.EmployeeQueryFilterDTO;
import com.padaria.model.employee.EmployeeModel;
import com.padaria.repository.EmployeeQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeQueryService {

    @Autowired
    private EmployeeQueryRepository employeeQueryRepository;

    @Transactional
    public ResponseEntity<List<EmployeeModel>> find(EmployeeQueryFilterDTO filterDTO) {
        List<EmployeeModel> employeeModels = employeeQueryRepository.find(filterDTO);
        return new ResponseEntity<List<EmployeeModel>>(employeeModels, HttpStatus.OK);
    }

}
