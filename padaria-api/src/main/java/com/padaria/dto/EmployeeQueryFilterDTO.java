package com.padaria.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class EmployeeQueryFilterDTO extends RepresentationModel<EmployeeQueryFilterDTO> {

    public List<Long> employeeIds;

    public List<Long> gender;

    public List<Long> maritalStatus;

    public List<Long> levelSchooling;

    public Date admissionDate;

    public List<Long> jobIds;

    public String city;

    public List<String> states;

}
