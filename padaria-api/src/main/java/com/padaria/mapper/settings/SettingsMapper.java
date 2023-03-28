package com.padaria.mapper.settings;

import com.padaria.dto.settings.SettingDTO;
import com.padaria.model.settings.SettingModel;
import org.springframework.stereotype.Component;

@Component
public class SettingsMapper {

    public SettingDTO toDTO(SettingModel settingModel) {
        if (settingModel == null) {
            return null;
        }
        return new SettingDTO(
                settingModel.getId(),
                settingModel.getName(),
                settingModel.getFileName(),
                settingModel.getLogo(),
                settingModel.getThemeColor()
        );
    }

    public SettingModel toEntity(SettingDTO settingDTO) {

        if (settingDTO == null) {
            return null;
        }

        SettingModel settingModel = new SettingModel();
        if (settingDTO.id() != null) {
            settingModel.setId(settingDTO.id());
        }
        settingModel.setName(settingDTO.name());
        settingModel.setLogo(settingDTO.logo());
        settingModel.setFileName(settingDTO.fileName());
        settingModel.setThemeColor(settingDTO.themeColor());
        return settingModel;
    }

}
