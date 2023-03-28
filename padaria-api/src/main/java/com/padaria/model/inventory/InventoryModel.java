package com.padaria.model.inventory;

import com.padaria.dto.inventory.InventoryDTO;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name= "estoque")
public class InventoryModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public long itemId;

    @Column(name="descricaoItem", nullable = false, length = 200)
    public String itemDescription;

    @Column(name="codPedido", nullable = false, length = 200)
    public String requestId;

    @Column(name="codNotaFiscal", nullable = false, length = 200)
    public String fiscalNoteId;

    @Column(name="codProduto", nullable = false)
    public Long productId;

    public InventoryDTO convertEntityToDTO() {
        return new ModelMapper().map(this, InventoryDTO.class);
    }

}