package com.padaria.model.supplier;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "fornecedor")
public class SupplierModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="nomeFantasia", nullable = false, length = 200)
    public String comercialName;

    @Column(name="cnpj", length = 14)
    public String cnpj;

    @Column(name="telefone", length = 15)
    public String phone;

    @Column(name="cep", nullable = false, length = 11)
    public String zipCodeAddresses;

    @Column(name="estado", length = 200)
    public String state;

    @Column(name="bairro", length = 200)
    public String district;

    @Column(name="endereco", length = 200)
    public String street;

    @Column(name="cidade", length = 200)
    public String city;

    @Column(name="email", length = 200)
    public String email;

}