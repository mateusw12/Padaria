package com.padaria.dto.job;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;


public record JobDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name
) {

}
