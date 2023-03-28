package com.padaria.repository;

import com.padaria.model.salesRequest.SalesRequestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRequestRepository extends JpaRepository<SalesRequestModel, Long> {

}
