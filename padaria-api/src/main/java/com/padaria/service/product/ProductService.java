package com.padaria.service.product;

import com.padaria.dto.product.ProductDTO;
import com.padaria.mapper.product.ProductMapper;
import com.padaria.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springfox.documentation.annotations.Cacheable;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Transactional
    public ProductDTO findById(Long id) {
        return productRepository.findById(id).map(productMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Product not found" + id));
    }

    @Transactional
    public List<ProductDTO> findALl() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "barCodes")
    @Transactional
    public ProductDTO findByBarCode(String barCorde) {
        return productMapper.toDTO(productRepository.findByBarCode(barCorde));
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO){
        return productMapper.toDTO(productRepository.save(productMapper.toEntity(productDTO)));
    }

    @Transactional
    public void delete(Long id){
        productRepository.delete(productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found" + id)));
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(productDTO.name());
                    recordFound.setDescription(productDTO.description());
                    recordFound.setBrandId(productDTO.brandId());
                    recordFound.setGroupedCodes(productDTO.groupedCodes());
                    recordFound.setManufacturerId(productDTO.manufacturerId());
                    recordFound.setUnitaryPrice(productDTO.unitaryPrice());
                    recordFound.setUnitMeasureId(productDTO.unitMeasureId());
                    recordFound.setBarCode(productDTO.barCode());
                    return productMapper.toDTO(productRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Product not found" + id));
    }

}
