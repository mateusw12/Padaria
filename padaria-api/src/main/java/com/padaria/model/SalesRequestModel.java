package com.padaria.model;

import com.padaria.dto.SalesRequestDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
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

    public SalesRequestDTO convertEntityToDTO() {
        return new ModelMapper().map(this, SalesRequestDTO.class);
    }

}