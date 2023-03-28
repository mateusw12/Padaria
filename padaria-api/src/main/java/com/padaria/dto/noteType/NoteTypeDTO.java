package com.padaria.dto.noteType;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record NoteTypeDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 10) String abbreviation
) {

}
