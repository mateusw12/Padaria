package com.padaria.repository.impl;

import com.padaria.dto.productQuery.ProductQueryFilterDTO;
import com.padaria.model.product.ProductModel;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductQueryRepository {

    private final EntityManager em;

    public ProductQueryRepository(EntityManager em) {
        this.em = em;
    }

    public List<ProductModel> find(ProductQueryFilterDTO filterDTO) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<ProductModel> query = cb.createQuery(ProductModel.class);

        Root<ProductModel> product = query.from(ProductModel.class);
        List<Predicate> predicates = new ArrayList<>();

        if (filterDTO.getProductIds().size() > 0 && !filterDTO.getProductIds().isEmpty()) {
            predicates.add(product.get("id").in(filterDTO.getProductIds()));
        }
        if (filterDTO.getBrandIds().size() > 0 && !filterDTO.getBrandIds().isEmpty()) {
            predicates.add(product.get("cod_marca").in(filterDTO.getBrandIds()));
        }
        if (filterDTO.getUnitMeasureIds().size() > 0 && !filterDTO.getUnitMeasureIds().isEmpty()) {
            predicates.add(product.get("cod_unidade_medida").in(filterDTO.getUnitMeasureIds()));
        }
        if (filterDTO.getManufacturerIds().size() > 0 && !filterDTO.getManufacturerIds().isEmpty()) {
            predicates.add(product.get("cod_fabricante").in(filterDTO.getManufacturerIds()));
        }
        if (filterDTO.getProductName() != null) {
            String productName = filterDTO.getProductName().trim();
            if (!productName.isEmpty()) {
                predicates.add(cb.like(cb.lower(product.get("nome")), "%" + productName.toLowerCase() + "%"));
            }
        }
        query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
        return em.createQuery(query).getResultList();
    }

}