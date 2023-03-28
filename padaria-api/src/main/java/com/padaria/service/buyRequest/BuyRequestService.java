package com.padaria.service.buyRequest;

import com.padaria.dto.buyRequest.BuyRequestDTO;
import com.padaria.mapper.buyRequest.BuyRequestMapper;
import com.padaria.repository.buyRequest.BuyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuyRequestService {

    @Autowired
    private BuyRequestRepository buyRequestRepository;

    @Autowired
    private BuyRequestMapper buyRequestMapper;

    @Transactional
    public BuyRequestDTO findById(Long id) {
        return buyRequestRepository.findById(id).map(buyRequestMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Buy request not found" + id));
    }

    @Transactional
    public List<BuyRequestDTO> findALl() {
        return buyRequestRepository.findAll()
                .stream()
                .map(buyRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public BuyRequestDTO create(BuyRequestDTO buyRequestDTO) {
        return buyRequestMapper.toDTO(buyRequestRepository.save(buyRequestMapper.toEntity(buyRequestDTO)));
    }

    @Transactional
    public void delete(Long id) {
        buyRequestRepository.delete(buyRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Buy request not found" + id)));
    }

    @Transactional
    public BuyRequestDTO update(Long id, BuyRequestDTO buyRequestDTO) {
        return buyRequestRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setRequestId(buyRequestDTO.requestId());
                    recordFound.setAmount(buyRequestDTO.amount());
                    recordFound.setDeliveryDate(buyRequestDTO.deliveryDate());
                    recordFound.setEmployeeId(buyRequestDTO.employeeId());
                    recordFound.setIssueDate(buyRequestDTO.issueDate());
                    recordFound.setItemId(buyRequestDTO.itemId());
                    recordFound.setNoteTypeId(buyRequestDTO.noteTypeId());
                    recordFound.setObservation(buyRequestDTO.observation());
                    recordFound.setPaymentCondition(buyRequestDTO.paymentCondition());
                    recordFound.setProductId(buyRequestDTO.productId());
                    recordFound.setSupplierId(buyRequestDTO.supplierId());
                    recordFound.setTotalValue(buyRequestDTO.totalValue());
                    return buyRequestMapper.toDTO(buyRequestRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Buy request not found" + id));
    }

}
