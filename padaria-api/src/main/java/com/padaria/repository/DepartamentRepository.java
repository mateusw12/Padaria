package com.padaria.repository;

import com.padaria.model.departament.DepartamentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentRepository extends JpaRepository<DepartamentModel, Long> {

}