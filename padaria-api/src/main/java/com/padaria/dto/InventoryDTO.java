package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public record InventoryDTO(
        @Id() Long itemId,
        @NotNull() @Length(max = 200) String itemDescription,
        @NotNull() @Length(max = 200) String requestId,
        @NotNull() @Length(max = 200) String fiscalNoteId,
        @NotNull() Long productId
) {

}
