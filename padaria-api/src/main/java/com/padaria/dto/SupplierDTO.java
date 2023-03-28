package com.padaria.dto;

import com.padaria.model.supplier.SupplierModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CNPJ;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Setter
@Getter
public class SupplierDTO extends RepresentationModel<SupplierDTO> {

    @Id
    public long id;

    @NotNull
    @Length(max = 200)
    public String name;

    @NotNull
    @Length(max = 200)
    public String comercialName;

    @CNPJ(message = "Cnpj invalid")
    @Length(max = 14)
    public String cnpj;

    @Length(max = 200)
    public String phone;

    @NotNull
    @Pattern(regexp =  "/^[0-9]{8}$/", message = "Zip code addresses invalid")
    @Length(max = 11)
    public String zipCodeAddresses;

    @Length(max = 200)
    public String state;

    @Length(max = 200)
    public String district;

    @Length(max = 200)
    public String street;

    @Length(max = 200)
    public String city;

    @Length(max = 200)
    public String email;

    public SupplierModel convertDTOToEntity() {
        return new ModelMapper().map(this, SupplierModel.class);
    }

}
