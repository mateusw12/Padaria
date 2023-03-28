package com.padaria.dto.productQuery;

import java.util.List;

public record ProductQueryFilterDTO(
        List<Long> productIds,
        List<Long> brandIds,
        List<Long> unitMeasureIds,
        List<Long> manufacturerIds,
        String productName
) {

}
