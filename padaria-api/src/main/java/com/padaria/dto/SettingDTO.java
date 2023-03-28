package com.padaria.dto;

import com.padaria.model.settings.SettingModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class SettingDTO extends RepresentationModel<SettingDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 200)
    public String fileName;

    @Length(max = 50)
    public String logo;

    public String themeColor;

    public SettingModel convertDTOToEntity() {
        return new ModelMapper().map(this, SettingModel.class);
    }

}
