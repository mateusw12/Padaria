package com.padaria.dto;

import com.padaria.model.inventory.InventoryModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class InventoryDTO extends RepresentationModel<InventoryDTO> {

    @Id()
    public Long itemId;

    @NotNull()
    @Length(max = 200)
    public String itemDescription;

    @NotNull()
    @Length(max = 200)
    public String requestId;

    @NotNull()
    @Length(max = 200)
    public String fiscalNoteId;

    @NotNull()
    public Long productId;

    public InventoryModel convertDTOToEntity() {
        return new ModelMapper().map(this, InventoryModel.class);
    }

}
