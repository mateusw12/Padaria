package com.padaria.mapper.noteType;

import com.padaria.dto.noteType.NoteTypeDTO;
import com.padaria.model.noteType.NoteTypeModel;
import org.springframework.stereotype.Component;

@Component
public class NoteTypeMapper {

    public NoteTypeDTO toDTO(NoteTypeModel noteTypeModel) {
        if (noteTypeModel == null) {
            return null;
        }
        return new NoteTypeDTO(
                noteTypeModel.getId(),
                noteTypeModel.getName(),
                noteTypeModel.getAbbreviation()
        );
    }

    public NoteTypeModel toEntity(NoteTypeDTO noteTypeDTO) {

        if (noteTypeDTO == null) {
            return null;
        }

        NoteTypeModel noteTypeModel = new NoteTypeModel();
        if (noteTypeDTO.id() != null) {
            noteTypeModel.setId(noteTypeDTO.id());
        }
        noteTypeModel.setName(noteTypeDTO.name());
        noteTypeModel.setAbbreviation(noteTypeDTO.abbreviation());
        return noteTypeModel;
    }

}
