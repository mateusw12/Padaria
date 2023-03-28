package com.padaria.dto.supplier;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public record SupplierDTO(
        @Id Long id,
        @NotNull @Length(max = 200) String name,
        @NotNull @Length(max = 200) String comercialName,
        @CNPJ(message = "Cnpj invalid") @Length(max = 14) String cnpj,
        @Length(max = 200) String phone,
        @NotNull @Pattern(regexp =  "/^[0-9]{8}$/", message = "Zip code addresses invalid") @Length(max = 11) String zipCodeAddresses,
        @Length(max = 200) String state,
        @Length(max = 200) String district,
        @Length(max = 200) String street,
        @Length(max = 200) String city,
        @Length(max = 200) String email
) {

}
