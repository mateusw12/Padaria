package com.padaria.dto.employee;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

public record EmployeeDTO(
        @Id Long id,
        @NotNull @Length(max = 200) String name,
        @NotNull Date admissionDate,
        @NotNull Date birthDate,
        @Length(max = 200) String city,
        @Length(max = 200) String street,
        @Length(max = 200) String district,
        @Length(max = 200) String state,
        @Length(max = 200) String email,
        @NotNull Double hourlyWork,
        @NotNull Long jobId,
        @Length(max = 15) String phone,
        @NotNull Long workingHours,
        @NotNull @Length(max = 14) String zipCodeAddresses,
        @NotNull @CPF @Length(max = 11) String cpf,
        @NotNull Long maritalStatus,
        @NotNull Long gender,
        @NotNull Long levelSchooling
) {

}
