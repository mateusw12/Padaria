package com.padaria.service.settings;

import com.padaria.dto.settings.SettingDTO;
import com.padaria.mapper.settings.SettingsMapper;
import com.padaria.model.settings.SettingModel;
import com.padaria.repository.settings.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private SettingsMapper settingsMapper;

    @Transactional
    public SettingDTO findAll() {
        List<SettingModel> settingModels = settingRepository.findAll();
        return settingsMapper.toDTO(settingModels.get(0));
    }

    @Transactional
    public SettingDTO create(SettingDTO settingDTO) {
        settingRepository.deleteAll();
        return settingsMapper.toDTO(settingRepository.save(settingsMapper.toEntity(settingDTO)));
    }

    @Transactional
    public void delete(Long id) {
        settingRepository.delete(settingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Settings not found" + id)));
    }

    @Transactional
    public SettingDTO update(Long id, SettingDTO settingDTO) {
        return settingRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(settingDTO.name());
                    recordFound.setThemeColor(settingDTO.themeColor());
                    recordFound.setLogo(settingDTO.logo());
                    return settingsMapper.toDTO(settingRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Settings not found" + id));
    }

}
