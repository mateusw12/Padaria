package com.padaria.dto.buyRequest;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

public record BuyRequestDTO(
        @Id() Long itemId,
        @NotNull() @Length(max = 200) String requestId,
        @Length(max = 1000)  String observation,
        @NotNull() Double amount,
        @NotNull() Long noteTypeId,
        @NotNull() Long productId,
        @NotNull() Long employeeId,
        @NotNull() Long supplierId,
        @NotNull() Double totalValue,
        @NotNull() Date issueDate,
        @NotNull() Date deliveryDate,
        @NotNull() Long paymentCondition
) {

}
