package com.padaria.model.buyRequest;

import com.padaria.dto.buyRequest.BuyRequestDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name= "pedidoCompra")
public class BuyRequestModel implements Serializable {

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

    @Column(name="codProduto", nullable = false)
    public Long productId;

    @Column(name="codFuncionario", nullable = false)
    public Long employeeId;

    @Column(name="codFornecedor", nullable = false)
    public Long supplierId;

    @Column(name="vlrTotal", nullable = false)
    public Double totalValue;

    @Temporal(TemporalType.DATE)
    @Column(name="dataEmissao", nullable = false)
    public Date issueDate;

    @Temporal(TemporalType.DATE)
    @Column(name="dataEntrega", nullable = false)
    public Date deliveryDate;

    @Column(name="condicaoPagamento", nullable = false, length = 200)
    public Long paymentCondition;

    public BuyRequestDTO convertEntityToDTO() {
        return new ModelMapper().map(this, BuyRequestDTO.class);
    }

}