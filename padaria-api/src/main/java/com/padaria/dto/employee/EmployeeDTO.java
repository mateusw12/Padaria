package com.padaria.dto.employee;

import com.padaria.converter.gender.GenderConverter;
import com.padaria.converter.levelSchooling.LevelSchoolingConverter;
import com.padaria.converter.maritalStatus.MaritalStatusConverter;
import com.padaria.converter.role.RoleConverter;
import com.padaria.model.gender.Gender;
import com.padaria.model.levelSchooling.LevelSchooling;
import com.padaria.model.maritalStatus.MaritalStatus;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Convert;
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
        @NotNull @Convert(converter = MaritalStatusConverter.class) MaritalStatus maritalStatus,
        @NotNull @Convert(converter = LevelSchoolingConverter.class) Gender gender,
        @NotNull @Convert(converter = GenderConverter.class) LevelSchooling levelSchooling
) {

}
