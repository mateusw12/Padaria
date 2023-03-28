package com.padaria.repository;

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

        if (filterDTO.getCity() != null) {
            predicates.add(cb.like(products.get("cidade"), "%" + filterDTO.getCity() + "%"));
        }

        if (filterDTO.getAdmissionDate() != null) {
            predicates.add(cb.equal(products.get("data_admissao"), filterDTO.getAdmissionDate()));
        }

        if (!filterDTO.getEmployeeIds().isEmpty()) {
            predicates.add(products.get("id").in(filterDTO.getEmployeeIds()));
        }

        if (!filterDTO.getJobIds().isEmpty()) {
            predicates.add(products.get("cod_cargo").in(filterDTO.getJobIds()));
        }

        if (!filterDTO.getMaritalStatus().isEmpty()) {
            predicates.add(products.get("estado_civil").in(filterDTO.getMaritalStatus()));
        }

        if (!filterDTO.getLevelSchooling().isEmpty()) {
            predicates.add(products.get("nivel_escolaridade").in(filterDTO.getLevelSchooling()));
        }

        if (!filterDTO.getGender().isEmpty()) {
            predicates.add(products.get("genero").in(filterDTO.getGender()));
        }

        if (!filterDTO.getStates().isEmpty()) {
            predicates.add(products.get("estado").in(filterDTO.getStates()));
        }

        query.where(predicates.toArray(new Predicate[predicates.size()]));
        return em.createQuery(query).getResultList();
    }

}