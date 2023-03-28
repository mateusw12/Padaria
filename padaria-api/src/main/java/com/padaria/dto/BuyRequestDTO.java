package com.padaria.dto;

import com.padaria.model.buyRequest.BuyRequestModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Setter
@Getter
public class BuyRequestDTO extends RepresentationModel<BuyRequestDTO>  {

    @Id()
    public Long itemId;

    @NotNull()
    @Length(max = 200)
    public String requestId;

    @Length(max = 1000)
    public String observation;

    @NotNull()
    public Double amount;

    @NotNull()
    public Long noteTypeId;

    @NotNull()
    public Long productId;

    @NotNull()
    public Long employeeId;

    @NotNull()
    public Long supplierId;

    @NotNull()
    public Double totalValue;

    @NotNull()
    public Date issueDate;

    @NotNull()
    public Date deliveryDate;

    @NotNull()
    public Long paymentCondition;

    public BuyRequestModel convertDTOToEntity() {
        return new ModelMapper().map(this, BuyRequestModel.class);
    }

}
