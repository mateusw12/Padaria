package com.padaria.model.employee;

import com.padaria.converter.gender.GenderConverter;
import com.padaria.converter.levelSchooling.LevelSchoolingConverter;
import com.padaria.converter.maritalStatus.MaritalStatusConverter;
import com.padaria.dto.employee.EmployeeDTO;
import com.padaria.model.gender.Gender;
import com.padaria.model.levelSchooling.LevelSchooling;
import com.padaria.model.maritalStatus.MaritalStatus;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name= "funcionario")
public class EmployeeModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Temporal(TemporalType.DATE)
    @Column(name="dataAdmissao", nullable = false)
    public Date admissionDate;

    @Temporal(TemporalType.DATE)
    @Column(name="dataAniversário", nullable = false)
    public Date birthDate;

    @Column(name="cidade", length = 200)
    public String city;

    @Column(name="endereco", length = 200)
    public String street;

    @Column(name="bairro", length = 200)
    public String district;

    @Column(name="estado", length = 200)
    public String state;

    @Column(name="email", length = 200)
    public String email;

    @Column(name="vlrHora", nullable = false, length = 200)
    public Double hourlyWork;

    @Column(name="codCargo", nullable = false, length = 200)
    public Long jobId;

    @Column(name="telefone", length = 15)
    public String phone;

    @Column(name="qtdHorasTrabalho", length = 200)
    public Long workingHours;

    @Column(name="cep", nullable = false, length = 14)
    public String zipCodeAddresses;

    @NotNull
    @CPF
    @Column(name="cpf", nullable = false, length = 11)
    public String cpf;

    @NotNull
    @Convert(converter = GenderConverter.class)
    @Column(name="genero", nullable = false, length = 200)
    public Gender gender;

    @NotNull
    @Convert(converter = LevelSchoolingConverter.class)
    @Column(name="nivelEscolaridade", nullable = false, length = 200)
    public LevelSchooling levelSchooling;

    @NotNull
    @Convert(converter = MaritalStatusConverter.class)
    @Column(name="estadoCivil", nullable = false, length = 200)
    public MaritalStatus maritalStatus;

    public EmployeeDTO convertEntityToDTO() {
        return new ModelMapper().map(this, EmployeeDTO.class);
    }

}