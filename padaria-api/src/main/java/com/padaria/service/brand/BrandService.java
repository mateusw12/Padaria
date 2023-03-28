package com.padaria.service.brand;

import com.padaria.dto.brand.BrandDTO;
import com.padaria.mapper.brand.BrandMapper;
import com.padaria.repository.brand.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private BrandMapper brandMapper;

    @Transactional
    public BrandDTO findById(Long id) {
        return brandRepository.findById(id).map(brandMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Brand not found" + id));
    }

    @Transactional
    public List<BrandDTO> findALl() {
        return brandRepository.findAll()
                .stream()
                .map(brandMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public BrandDTO create(BrandDTO brandDTO) {
        return brandMapper.toDTO(brandRepository.save(brandMapper.toEntity(brandDTO)));
    }

    @Transactional
    public void delete(Long id) {
        brandRepository.delete(brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brand not found" + id)));
    }

    @Transactional
    public BrandDTO update(Long id, BrandDTO brandDTO) {
        return brandRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(brandDTO.name());
                    return brandMapper.toDTO(brandRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Brand not found" + id));
    }

}
