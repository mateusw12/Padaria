package com.padaria.repository;

import com.padaria.model.SalesControlModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesControlRepository extends JpaRepository<SalesControlModel, Long> {

}
