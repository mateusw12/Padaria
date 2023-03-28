package com.padaria.dto.departament;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record DepartamentDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name
) {

}
