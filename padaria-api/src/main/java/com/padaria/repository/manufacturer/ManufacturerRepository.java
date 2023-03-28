package com.padaria.repository.manufacturer;

import com.padaria.model.manufacturer.ManufacturerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturerRepository extends JpaRepository<ManufacturerModel, Long> {

}
