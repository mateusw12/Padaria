package com.padaria.dto;


import java.util.Date;
import java.util.List;

public record SalesControlFilterDTO(
        Date startSalesDate,
        Date endSalesDate,
        List<Integer> productIds,
        List<Integer> brandIds
) {

}
