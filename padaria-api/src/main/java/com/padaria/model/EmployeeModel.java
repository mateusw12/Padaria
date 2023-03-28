package com.padaria.model;

import com.padaria.dto.EmployeeDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
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

    @Column(name="cpf", nullable = false, length = 11)
    public String cpf;

    @Column(name="genero", nullable = false, length = 200)
    public Long gender;

    @Column(name="nivelEscolaridade", nullable = false, length = 200)
    public Long levelSchooling;

    @Column(name="estadoCivil", nullable = false, length = 200)
    public Long maritalStatus;

    public EmployeeDTO convertEntityToDTO() {
        return new ModelMapper().map(this, EmployeeDTO.class);
    }

}