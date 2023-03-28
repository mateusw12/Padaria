package com.padaria.dto.manufacturer;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record ManufacturerDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200)  String name
) {

}
