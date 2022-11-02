import { PaymentCondition } from '../payment-condition/payment-condition';

export class SalesRequest {
  itemId: number = 0;
  requestId: string = '';
  employeeId: number = 0;
  noteTypeId: number = 0;
  paymentCondition: PaymentCondition = PaymentCondition.None;
  amount: number = 0;
  totalValue: number = 0;
  observation: string = '';
}
