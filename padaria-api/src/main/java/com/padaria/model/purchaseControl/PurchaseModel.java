package com.padaria.model.purchaseControl;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name= "compras")
public class PurchaseModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long id;

    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @Column(name="descricao", length = 200)
    public String description;

    @Column(name="notaFiscal", nullable = false, length = 200)
    public String fiscalNoteId;

    @Column(name="codFabricante", nullable = false)
    public Long manufacturerId;

    @Column(name="codNotaFiscal", nullable = false)
    public Long noteTypeId;

    @Column(name="quantidade", nullable = false)
    public Long amount;

    @Column(name="preco", nullable = false)
    public Double price;

    @Column(name="dataCompra", nullable = false)
    public Date purchaseDate;

    @Column(name="dataEntrega", nullable = false)
    public Date deliveryDate;

    @Column(name="arquivo", length = 200)
    public String file;

    @Column(name="nomeArquivo", length = 200)
    public String fileName;

}