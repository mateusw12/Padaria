package com.padaria.dto;

import com.padaria.model.PurchaseModel;
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
public class PurchaseDTO extends RepresentationModel<PurchaseDTO> {

    @Id()
    public Long id;

    @NotNull()
    @Length(max = 200)
    public String name;

    @Length(max = 200)
    public String description;

    @NotNull()
    @Length(max = 200)
    public String fiscalNoteId;

    @NotNull()
    public Long manufacturerId;

    @NotNull()
    public Long noteTypeId;

    @NotNull()
    public Long amount;

    @NotNull()
    public Double price;

    @NotNull()
    public Date purchaseDate;

    @NotNull()
    public Date deliveryDate;

    @Length(max = 200)
    public String file;

    @Length(max = 200)
    public String fileName;

    public PurchaseModel convertDTOToEntity() {
        return new ModelMapper().map(this, PurchaseModel.class);
    }

}
