package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record UnitMeasureDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 5) String abbreviation
) {

}
