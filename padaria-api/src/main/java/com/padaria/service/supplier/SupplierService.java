package com.padaria.service.supplier;

import com.padaria.dto.supplier.SupplierDTO;
import com.padaria.mapper.supplier.SupplierMapper;
import com.padaria.repository.supplier.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private SupplierMapper supplierMapper;

    @Transactional
    public SupplierDTO findById(Long id) {
        return supplierRepository.findById(id).map(supplierMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found" + id));
    }

    @Transactional
    public List<SupplierDTO> findALl() {
        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SupplierDTO create(SupplierDTO supplierDTO) {
        return supplierMapper.toDTO(supplierRepository.save(supplierMapper.toEntity(supplierDTO)));
    }

    @Transactional
    public void delete(Long id) {
        supplierRepository.delete(supplierRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found" + id)));
    }

    @Transactional
    public SupplierDTO update(Long id, SupplierDTO supplierDTO) {
        return supplierRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(supplierDTO.name());
                    recordFound.setCity(supplierDTO.city());
                    recordFound.setCnpj(supplierDTO.cnpj());
                    recordFound.setDistrict(supplierDTO.district());
                    recordFound.setEmail(supplierDTO.email());
                    recordFound.setComercialName(supplierDTO.comercialName());
                    recordFound.setPhone(supplierDTO.phone());
                    recordFound.setZipCodeAddresses(supplierDTO.zipCodeAddresses());
                    recordFound.setState(supplierDTO.state());
                    recordFound.setStreet(supplierDTO.street());
                    return supplierMapper.toDTO(supplierRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Supplier not found" + id));
    }

}
