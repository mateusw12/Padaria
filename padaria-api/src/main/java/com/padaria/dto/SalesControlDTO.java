package com.padaria.dto;

import com.padaria.model.SalesControlModel;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Setter
@Getter
public class SalesControlDTO extends RepresentationModel<SalesControlDTO> {

    @Id()
    public Long id;

    @NotNull()
    public Integer productId;

    @NotNull()
    public Integer brandId;

    @NotNull()
    public Integer amount;

    @NotNull()
    public Double totalValue;

    @NotNull()
    public Date registrationDate;

    @NotNull()
    public String userSales;

    public SalesControlModel convertDTOToEntity() {
        return new ModelMapper().map(this, SalesControlModel.class);
    }

}
