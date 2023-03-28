package com.padaria.service;

import com.padaria.dto.settings.SettingDTO;
import com.padaria.model.settings.SettingModel;
import com.padaria.repository.settings.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    @Transactional
    public SettingDTO findAll() {
        List<SettingModel> settingModels = settingRepository.findAll();
        SettingModel settingModel = settingModels.get(0);
        return settingModel.convertEntityToDTO();
    }

    @Transactional
    public SettingDTO create(SettingDTO settingDTO) {
        settingRepository.deleteAll();
        SettingModel settingModel = settingRepository.save(settingDTO.convertDTOToEntity());
        return settingModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<SettingDTO> delete(Long id) {
        settingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<SettingDTO> update(SettingDTO settingDTO) {
        List<SettingModel> settingModels = settingRepository.findAll();
        SettingModel settingModel = settingModels.get(0);

        SettingDTO dto = settingModel.convertEntityToDTO();
        dto.setName(settingDTO.getName());
        dto.setThemeColor(settingDTO.getThemeColor());
        dto.setLogo(settingDTO.getLogo());
        settingRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<SettingDTO>(dto, HttpStatus.OK);
    }

}
