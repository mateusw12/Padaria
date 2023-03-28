package com.padaria.repository.purchaseControl;

import com.padaria.model.purchaseControl.PurchaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends JpaRepository<PurchaseModel, Long> {

}
