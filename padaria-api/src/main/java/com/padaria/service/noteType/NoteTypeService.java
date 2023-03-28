package com.padaria.service.noteType;

import com.padaria.dto.noteType.NoteTypeDTO;
import com.padaria.mapper.noteType.NoteTypeMapper;
import com.padaria.repository.noteType.NoteTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteTypeService {

    @Autowired
    private NoteTypeRepository noteTypeRepository;

    @Autowired
    private NoteTypeMapper noteTypeMapper;

    @Transactional
    public NoteTypeDTO findById(Long id) {
        return noteTypeRepository.findById(id).map(noteTypeMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Note type not found" + id));
    }

    @Transactional
    public List<NoteTypeDTO> findALl() {
        return noteTypeRepository.findAll()
                .stream()
                .map(noteTypeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public NoteTypeDTO create(NoteTypeDTO noteTypeDTO) {
        return noteTypeMapper.toDTO(noteTypeRepository.save(noteTypeMapper.toEntity(noteTypeDTO)));
    }

    @Transactional
    public void delete(Long id) {
        noteTypeRepository.delete(noteTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note type not found" + id)));
    }

    @Transactional
    public NoteTypeDTO update(Long id, NoteTypeDTO noteTypeDTO) {
        return noteTypeRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(noteTypeDTO.name());
                    recordFound.setAbbreviation(noteTypeDTO.abbreviation());
                    return noteTypeMapper.toDTO(noteTypeRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Note type not found" + id));
    }

}
