import { PaymentCondition } from '../payment-condition/payment-condition';

export class BuyRequest {
  requestId: string = '';
  observation: string = '';
  itemId: number = 0;
  amount: number = 0;
  noteTypeId: number = 0;
  productId: number = 0;
  totalValue: number = 0;
  supplierId: number = 0;
  employeeId: number = 0;
  issueDate: Date = new Date();
  deliveryDate: Date = new Date();
  paymentCondition: PaymentCondition = PaymentCondition.None;
}
