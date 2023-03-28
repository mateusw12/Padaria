package com.padaria.repository;

import com.padaria.model.unitMeasure.UnitMeasureModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitMeasureRepository extends JpaRepository<UnitMeasureModel, Long> {

}
