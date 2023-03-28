package com.padaria.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

public record PurchaseDTO(
        @Id() Long id,
        @NotNull() @Length(max = 200) String name,
        @Length(max = 200) String description,
        @NotNull() @Length(max = 200) String fiscalNoteId,
        @NotNull() Long manufacturerId,
        @NotNull() Long noteTypeId,
        @NotNull() Long amount,
        @NotNull() Double price,
        @NotNull() Date purchaseDate,
        @NotNull() Date deliveryDate,
        @Length(max = 200) String file,
        @Length(max = 200) String fileName
) {

}
