package com.padaria.dto.brand;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record BrandDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name
) {

}
