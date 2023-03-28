package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;


public record JobDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 10) String abbreviation
) {

}
