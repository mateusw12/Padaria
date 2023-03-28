package com.padaria.model.salesControl;

import com.padaria.dto.SalesControlFilterDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class SalesControlFilterModel implements Serializable {

    public Date startSalesDate;

    public Date endSalesDate;

    public List<Integer> productIds;

    public List<Integer> brandIds;

    public SalesControlFilterDTO convertEntityToDTO() {
        return new ModelMapper().map(this, SalesControlFilterDTO.class);
    }

}