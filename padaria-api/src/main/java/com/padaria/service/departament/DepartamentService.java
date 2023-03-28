package com.padaria.service.departament;

import com.padaria.dto.departament.DepartamentDTO;
import com.padaria.mapper.departament.DepartamentMapper;
import com.padaria.repository.departament.DepartamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartamentService {

    @Autowired
    private DepartamentRepository departamentRepository;

    @Autowired
    private DepartamentMapper departamentMapper;

    @Transactional
    public DepartamentDTO findById(Long id) {
        return departamentRepository.findById(id).map(departamentMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Departament not found" + id));
    }

    @Transactional
    public List<DepartamentDTO> findALl() {
        return departamentRepository.findAll()
                .stream()
                .map(departamentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DepartamentDTO create(DepartamentDTO departamentDTO) {
        return departamentMapper.toDTO(departamentRepository.save(departamentMapper.toEntity(departamentDTO)));
    }

    @Transactional
    public void delete(Long id) {
        departamentRepository.delete(departamentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Departament not found" + id)));
    }

    @Transactional
    public DepartamentDTO update(Long id, DepartamentDTO departamentDTO) {
        return departamentRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(departamentDTO.name());
                    return departamentMapper.toDTO(departamentRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Departament not found" + id));
    }

}
