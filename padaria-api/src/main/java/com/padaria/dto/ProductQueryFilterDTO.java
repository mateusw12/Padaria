package com.padaria.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@Setter
@Getter
public class ProductQueryFilterDTO extends RepresentationModel<ProductQueryFilterDTO> {

    public List<Long> productIds;

    public List<Long> brandIds;

    public List<Long> unitMeasureIds;

    public List<Long> manufacturerIds;

    public String productName;

}
