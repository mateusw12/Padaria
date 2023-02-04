package com.padaria.repository;

import com.padaria.model.NoteTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteTypeRepository extends JpaRepository<NoteTypeModel, Long> {

}
