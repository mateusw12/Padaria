package com.padaria.service.manufacturer;

import com.padaria.dto.manufacturer.ManufacturerDTO;
import com.padaria.mapper.manufacturer.ManufacturerMapper;
import com.padaria.repository.manufacturer.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private ManufacturerMapper manufacturerMapper;

    @Transactional
    public ManufacturerDTO findById(Long id) {
        return manufacturerRepository.findById(id).map(manufacturerMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found" + id));
    }

    @Transactional
    public List<ManufacturerDTO> findALl() {
        return manufacturerRepository.findAll()
                .stream()
                .map(manufacturerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ManufacturerDTO create(ManufacturerDTO manufacturerDTO) {
        return manufacturerMapper.toDTO(manufacturerRepository.save(manufacturerMapper.toEntity(manufacturerDTO)));
    }

    @Transactional
    public void delete(Long id) {
        manufacturerRepository.delete(manufacturerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found" + id)));
    }

    @Transactional
    public ManufacturerDTO update(Long id, ManufacturerDTO manufacturerDTO) {
        return manufacturerRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(manufacturerDTO.name());
                    return manufacturerMapper.toDTO(manufacturerRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Manufacturer not found" + id));
    }

}
