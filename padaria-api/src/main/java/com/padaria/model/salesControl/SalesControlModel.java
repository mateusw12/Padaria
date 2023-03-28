package com.padaria.model.salesControl;

import com.padaria.dto.salesControl.SalesControlDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name= "controleVenda")
public class SalesControlModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="codProduto", nullable = false)
    public Integer productId;

    @Column(name="codMarca", nullable = false)
    public Integer brandId;

    @Column(name="quantidade", nullable = false)
    public Integer amount;

    @Column(name="vlrTotal", nullable = false)
    public Double totalValue;

    @Column(name="dataCadastro", nullable = false)
    public Date registrationDate;

    @Column(name="usuarioVenda", nullable = false)
    public String userSales;

    public SalesControlDTO convertEntityToDTO() {
        return new ModelMapper().map(this, SalesControlDTO.class);
    }

}