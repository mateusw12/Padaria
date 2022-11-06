import { PaymentCondition } from '../payment-condition/payment-condition';

export class SalesRequest {
  itemId: number = 0;
  requestId: string = '';
  paymentCondition: PaymentCondition = PaymentCondition.None;
  amount: number = 0;
  totalValue: number = 0;
  observation: string = '';
}
