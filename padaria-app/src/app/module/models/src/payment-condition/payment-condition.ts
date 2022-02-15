export enum PaymentCondition {
  CashOption = 1,
  NonCashOption = 2,
}

export const paymentConditino = new Map<PaymentCondition, string>([
  [PaymentCondition.CashOption, 'Pagamento á Vista'],
  [PaymentCondition.NonCashOption, 'Pagamento á Prazo'],
]);
