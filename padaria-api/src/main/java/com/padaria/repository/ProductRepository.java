package com.padaria.repository;

import com.padaria.model.product.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {

    ProductModel findByBarCode(String barCode);

}
