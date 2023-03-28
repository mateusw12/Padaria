package com.padaria.dto.salesControl;


import java.util.Date;
import java.util.List;

public record SalesControlFilterDTO(
        Date startSalesDate,
        Date endSalesDate,
        List<Integer> productIds,
        List<Integer> brandIds
) {

}
