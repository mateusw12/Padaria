package com.padaria.model.salesControl;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class SalesControlFilterModel implements Serializable {

    public Date startSalesDate;

    public Date endSalesDate;

    public List<Integer> productIds;

    public List<Integer> brandIds;

}