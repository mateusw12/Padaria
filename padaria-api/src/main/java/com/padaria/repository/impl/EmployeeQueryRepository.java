package com.padaria.repository.impl;

import com.padaria.dto.employeeQuery.EmployeeQueryFilterDTO;
import com.padaria.model.employee.EmployeeModel;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeQueryRepository {
    private final EntityManager em;

    public EmployeeQueryRepository(EntityManager em) {
        this.em = em;
    }

    public List<EmployeeModel> find(EmployeeQueryFilterDTO filterDTO) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<EmployeeModel> query = cb.createQuery(EmployeeModel.class);

        Root<EmployeeModel> products = query.from(EmployeeModel.class);
        List<Predicate> predicates = new ArrayList<>();

        if (filterDTO.city() != null) {
            predicates.add(cb.like(products.get("cidade"), "%" + filterDTO.city() + "%"));
        }

        if (filterDTO.admissionDate() != null) {
            predicates.add(cb.equal(products.get("data_admissao"), filterDTO.admissionDate()));
        }

        if (!filterDTO.employeeIds().isEmpty()) {
            predicates.add(products.get("id").in(filterDTO.employeeIds()));
        }

        if (!filterDTO.jobIds().isEmpty()) {
            predicates.add(products.get("cod_cargo").in(filterDTO.jobIds()));
        }

        if (!filterDTO.maritalStatus().isEmpty()) {
            predicates.add(products.get("estado_civil").in(filterDTO.maritalStatus()));
        }

        if (!filterDTO.levelSchooling().isEmpty()) {
            predicates.add(products.get("nivel_escolaridade").in(filterDTO.levelSchooling()));
        }

        if (!filterDTO.gender().isEmpty()) {
            predicates.add(products.get("genero").in(filterDTO.gender()));
        }

        if (!filterDTO.states().isEmpty()) {
            predicates.add(products.get("estado").in(filterDTO.states()));
        }

        query.where(predicates.toArray(new Predicate[predicates.size()]));
        return em.createQuery(query).getResultList();
    }

}