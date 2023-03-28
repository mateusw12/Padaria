package com.padaria.service;

import com.padaria.dto.SupplierDTO;
import com.padaria.exceptions.EntityNotFountException;
import com.padaria.model.supplier.SupplierModel;
import com.padaria.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Transactional
    public SupplierDTO findById(Long id) {
        SupplierModel supplierModel = supplierRepository.findById(id).orElseThrow(
                () -> new EntityNotFountException("Id not found" + id)
        );
        return supplierModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<List<SupplierDTO>> findALl() {
        List<SupplierModel> supplierModels = supplierRepository.findAll();
        List<SupplierDTO> supplierDTOS = new ArrayList<>();
        supplierModels.stream().forEach(t -> supplierDTOS.add(t.convertEntityToDTO()));
        return new ResponseEntity<List<SupplierDTO>>(supplierDTOS, HttpStatus.OK);
    }

    @Transactional
    public SupplierDTO create(SupplierDTO supplierDTO) {
        SupplierModel supplierModel = supplierRepository.save(supplierDTO.convertDTOToEntity());
        return supplierModel.convertEntityToDTO();
    }

    @Transactional
    public ResponseEntity<SupplierDTO> delete(Long id) {
        supplierRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<SupplierDTO> update(SupplierDTO supplierDTO) {
        SupplierModel supplierModel = supplierRepository.findById(supplierDTO.getId()).orElseThrow(
                () -> new EntityNotFountException("Id not found" + supplierDTO.getId())
        );

        SupplierDTO dto = supplierModel.convertEntityToDTO();
        dto.setName(supplierDTO.getName());
        dto.setCity(supplierDTO.getCity());
        dto.setCnpj(supplierDTO.getCnpj());
        dto.setDistrict(supplierDTO.getDistrict());
        dto.setEmail(supplierDTO.getEmail());
        dto.setComercialName(supplierDTO.getComercialName());
        dto.setPhone(supplierDTO.getPhone());
        dto.setEmail(supplierDTO.getEmail());
        dto.setZipCodeAddresses(supplierDTO.getZipCodeAddresses());
        dto.setState(supplierDTO.getState());
        dto.setStreet(supplierDTO.getStreet());
        supplierRepository.save(dto.convertDTOToEntity());
        return new ResponseEntity<SupplierDTO>(dto, HttpStatus.OK);
    }

}
