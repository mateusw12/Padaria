package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record SettingDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 200) String fileName,
        @Length(max = 50) String logo,
        String themeColor
) {

}
