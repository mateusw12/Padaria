package com.padaria.model;

import com.padaria.dto.SalesControlFilterDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class SalesControlFilterModel implements Serializable {

    public Date startSalesDate;

    public Date endSalesDate;

    public List<Integer> productIds;

    public List<Integer> brandIds;

    public SalesControlFilterDTO convertEntityToDTO() {
        return new ModelMapper().map(this, SalesControlFilterDTO.class);
    }

}