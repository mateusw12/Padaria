package com.padaria.repository.salesControl;

import com.padaria.model.salesControl.SalesControlModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesControlRepository extends JpaRepository<SalesControlModel, Long> {

}
