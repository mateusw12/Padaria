package com.padaria.service.salesRequest;

import com.padaria.dto.salesRequest.SalesRequestDTO;
import com.padaria.mapper.salesRequest.SalesRequestMapper;
import com.padaria.repository.salesRequest.SalesRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesRequestService {

    @Autowired
    private SalesRequestRepository salesRequestRepository;

    @Autowired
    private SalesRequestMapper salesRequestMapper;

    @Transactional
    public SalesRequestDTO findById(Long id) {
        return salesRequestRepository.findById(id).map(salesRequestMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Sales request not found" + id));
    }

    @Transactional
    public List<SalesRequestDTO> findALl() {
        return salesRequestRepository.findAll()
                .stream()
                .map(salesRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SalesRequestDTO create(SalesRequestDTO salesRequestDTO) {
        return salesRequestMapper.toDTO(salesRequestRepository.save(salesRequestMapper.toEntity(salesRequestDTO)));
    }

    @Transactional
    public void delete(Long id) {
        salesRequestRepository.delete(salesRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sales request not found" + id)));
    }

    @Transactional
    public SalesRequestDTO update(Long id, SalesRequestDTO salesRequestDTO) {
        return salesRequestRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setAmount(salesRequestDTO.amount());
                    recordFound.setObservation(salesRequestDTO.observation());
                    recordFound.setRequestId(salesRequestDTO.requestId());
                    recordFound.setItemId(salesRequestDTO.itemId());
                    recordFound.setProductId(salesRequestDTO.productId());
                    recordFound.setNoteTypeId(salesRequestDTO.noteTypeId());
                    recordFound.setTotalValue(salesRequestDTO.totalValue());
                    recordFound.setPaymentCondition(salesRequestDTO.paymentCondition());
                    recordFound.setEmployeeId(salesRequestDTO.employeeId());
                    recordFound.setSupplierId(salesRequestDTO.supplierId());
                    return salesRequestMapper.toDTO(salesRequestRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Sales request not found" + id));
    }

}
