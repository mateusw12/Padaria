package com.padaria.service.noteType;

import com.padaria.dto.noteType.NoteTypeDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.noteType.NoteTypeModel;
import com.padaria.repository.noteType.NoteTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteTypeService {

    @Autowired
    private NoteTypeRepository noteTypeRepository;

    @Transactional
    public NoteTypeDTO findById(Long id) {
        NoteTypeModel noteTypeModel = noteTypeRepository.findById(id).orElseThrow(() -> new EntityNotFountException("Id not found" + id));
        return noteTypeModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<NoteTypeDTO>> findALl() {
        List<NoteTypeModel> noteTypeModels = noteTypeRepository.findAll();
        List<NoteTypeDTO> noteTypeDTOS = new ArrayList<>();
        noteTypeModels.stream().forEach(t -> noteTypeDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<NoteTypeDTO>>(noteTypeDTOS, HttpStatus.OK);
    }

    @Transactional
    public NoteTypeDTO create(NoteTypeDTO noteTypeDTO) {
        NoteTypeModel noteTypeModel = noteTypeRepository.save(noteTypeDTO.convertDTOToEntity());
        return noteTypeModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<NoteTypeDTO> delete(Long id) {
        noteTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<NoteTypeDTO> update(NoteTypeDTO noteTypeDTO) {
        NoteTypeModel noteTypeModel = noteTypeRepository.findById(noteTypeDTO.getId().longValue()).orElseThrow(() -> new EntityNotFountException("Id not found" + noteTypeDTO.getId()));

        NoteTypeDTO dto = noteTypeModel.convertEntityToDTO();
        dto.setName(noteTypeDTO.getName());
        dto.setAbbreviation(noteTypeDTO.getAbbreviation());
        noteTypeRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<NoteTypeDTO>(dto, HttpStatus.OK);
    }

}
