package com.padaria.dto;

import com.padaria.model.product.ProductModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class ProductDTO extends RepresentationModel<ProductDTO> {

    @Id
    public long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 200)
    public String description;

    @Length(max = 200)
    public String groupedCodes;

    @NotNull()
    public long unitMeasureId;

    @NotNull()
    public long brandId;

    @NotNull()
    public long manufacturerId;

    @NotNull()
    public double unitaryPrice;

    @NotNull()
    public double amount;

    @NotNull()
    @Length(max = 13)
    public String barCode;

    public ProductModel convertDTOToEntity() {
        return new ModelMapper().map(this, ProductModel.class);
    }

}
