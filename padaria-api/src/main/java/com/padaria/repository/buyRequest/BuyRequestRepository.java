package com.padaria.repository.buyRequest;

import com.padaria.model.buyRequest.BuyRequestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyRequestRepository extends JpaRepository<BuyRequestModel, Long> {

}
