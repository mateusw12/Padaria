import { Component, OnInit, ViewChild } from '@angular/core';
import { TabContent } from '@module/utils/interfaces';
import { SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { BuyRequestComponent } from './buy-request/buy-request.component';
import { InventoryControlComponent } from './inventory-control/inventory-control.component';
import { SalesRequestComponent } from './sales-request/sales-request.component';

interface InventoryTabs {
  inventoryControl: TabContent;
  buyRequest: TabContent;
  salesRequest: TabContent;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  readonly tabSettings: InventoryTabs = {
    inventoryControl: {
      heading: 'Controle de Estoque',
      index: 0,
    },
    buyRequest: {
      heading: 'Consulta Pedido de Compra',
      index: 1,
    },
    salesRequest: {
      heading: 'Consulta Pedido de Venda',
      index: 2,
    },
  };

  @ViewChild(SalesRequestComponent, { static: false })
  private salesRequestTab!: SalesRequestComponent;

  @ViewChild(BuyRequestComponent, { static: false })
  private buyRequestTab!: BuyRequestComponent;

  @ViewChild(InventoryControlComponent, { static: false })
  private inventoryControlTab!: InventoryControlComponent;

  ngOnInit(): void {}

  onSelected(args: SelectEventArgs): void {
    switch (args.selectedIndex) {
      case this.tabSettings.inventoryControl.index:
        this.inventoryControlTab.load();
        break;
      case this.tabSettings.buyRequest.index:
        this.buyRequestTab.load();
        break;
      case this.tabSettings.salesRequest.index:
        this.salesRequestTab.load();
        break;
      default:
        break;
    }
  }
}
