package com.padaria.model.salesRequest;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "pedidoVenda")
public class SalesRequestModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long itemId;

    @Column(name="codPedido", nullable = false, length = 200)
    public String requestId;

    @Column(name="observacao", length = 1000)
    public String observation;

    @Column(name="qtd", nullable = false)
    public Double amount;

    @Column(name="codTipoNota", nullable = false)
    public Long noteTypeId;

    @Column(name="codFuncionario", nullable = false)
    public Long employeeId;

    @Column(name="codFornecedor", nullable = false)
    public Long supplierId;

    @Column(name="codProduto", nullable = false)
    public Long productId;

    @Column(name="vlrTotal", nullable = false)
    public Double totalValue;

    @Column(name="condicaoPagamento", nullable = false, length = 200)
    public Long paymentCondition;

}