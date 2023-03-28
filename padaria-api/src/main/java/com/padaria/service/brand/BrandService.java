package com.padaria.service.brand;

import com.padaria.dto.brand.BrandDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.brand.BrandModel;
import com.padaria.repository.brand.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Transactional
    public BrandDTO findById(Long id) {
        BrandModel brandModel = brandRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return brandModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<BrandDTO>> findALl() {
        List<BrandModel> brandModel = brandRepository.findAll();
        List<BrandDTO> brandDTOS = new ArrayList<>();
        brandModel.stream().forEach(t -> brandDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<BrandDTO>>(brandDTOS, HttpStatus.OK);
    }

    @Transactional
    public BrandDTO create(BrandDTO brandDTO) {
        BrandModel brandModel = brandRepository.save(brandDTO.convertDTOToEntity());
        return brandModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<BrandDTO> delete(Long id) {
        brandRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<BrandDTO> update(BrandDTO brandDTO) {
        BrandModel brandModel = brandRepository.findById(brandDTO.getId().longValue()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + brandDTO.getId())
        );

        BrandDTO dto = brandModel.convertEntityToDTO();

        dto.setName(brandDTO.getName());
        brandRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<BrandDTO>(brandDTO, HttpStatus.OK);
    }

}
