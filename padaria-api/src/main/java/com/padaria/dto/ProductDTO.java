package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record ProductDTO(
        @Id long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 200) String description,
        @Length(max = 200) String groupedCodes,
        @NotNull() Long unitMeasureId,
        @NotNull() Long brandId,
        @NotNull() Long manufacturerId,
        @NotNull() Double unitaryPrice,
        @NotNull() Double amount,
        @NotNull() @Length(max = 13) String barCode
) {

}
