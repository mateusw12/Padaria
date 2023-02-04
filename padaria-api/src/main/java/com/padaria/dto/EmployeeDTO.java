package com.padaria.dto;

import com.padaria.model.EmployeeModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class EmployeeDTO extends RepresentationModel<EmployeeDTO> {

    @Id
    public long id;

    @NotNull
    @Length(max = 200)
    public String name;

    @NotNull
    public Date admissionDate;

    @NotNull
    public Date birthDate;

    @Length(max = 200)
    public String city;

    @Length(max = 200)
    public String street;

    @Length(max = 200)
    public String district;

    @Length(max = 200)
    public String state;

    @Length(max = 200)
    public String email;

    @NotNull
    public Double hourlyWork;

    @NotNull
    public Long jobId;

    @Length(max = 15)
    public String phone;

    @NotNull
    public Long workingHours;

    @NotNull
    @Length(max = 14)
    public String zipCodeAddresses;

    @NotNull
    @CPF
    @Length(max = 11)
    public String cpf;

    @NotNull
    public Long maritalStatus;

    @NotNull
    public Long gender;

    @NotNull
    public Long levelSchooling;

    public EmployeeModel convertDTOToEntity() {
        return new ModelMapper().map(this, EmployeeModel.class);
    }

}
