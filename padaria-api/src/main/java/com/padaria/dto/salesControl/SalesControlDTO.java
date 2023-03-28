package com.padaria.dto.salesControl;


import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

public record SalesControlDTO(
        @Id() Long id,
        @NotNull() Integer productId,
        @NotNull() Integer brandId,
        @NotNull() Integer amount,
        @NotNull() Double totalValue,
        @NotNull() Date registrationDate,
        @NotNull() String userSales
) {

}
