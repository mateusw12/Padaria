package com.padaria.model;

import com.padaria.dto.ProductDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "produto")
public class ProductModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="descricao", length = 200)
    public String description;

    @Column(name="mascara", length = 200)
    public String groupedCodes;

    @Column(name="codUnidadeMedida", nullable = false )
    public long unitMeasureId;

    @Column(name="codMarca", nullable = false )
    public long brandId;

    @Column(name="codFabricante", nullable = false )
    public long manufacturerId;

    @Column(name="precoUnitario", nullable = false )
    public double unitaryPrice;

    @Column(name="quantidade", nullable = false )
    public double amount;

    @Column(name="codigoBarra", nullable = false, length = 13, unique = true)
    public String barCode;

    public ProductDTO convertEntityToDTO() {
        return new ModelMapper().map(this, ProductDTO.class);
    }

}