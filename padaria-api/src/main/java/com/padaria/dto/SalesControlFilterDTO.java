package com.padaria.dto;

import com.padaria.model.SalesControlFilterModel;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class SalesControlFilterDTO extends RepresentationModel<SalesControlFilterDTO> {


    public Date startSalesDate;

    public Date endSalesDate;

    public List<Integer> productIds;

    public List<Integer> brandIds;

    public SalesControlFilterModel convertDTOToEntity() {
        return new ModelMapper().map(this, SalesControlFilterModel.class);
    }

}
