export class PurchaseControl {
  id: number = 0;
  name: string = '';
  description: string = '';
  fiscalNoteId: string = '';
  manufacturerId: number = 0;
  noteTypeId: number = 0;
  amount: number = 0;
  price: number = 0;
  purchaseDate: Date = new Date();
  deliveryDate: Date = new Date();
  fileName: string = '';
  file: string = '';
}
