import { describe } from '@module/utils/functions/enum';

export enum PaymentCondition {
  None = 0,
  CashOption = 1,
  NonCashOption = 2,
}

describe(PaymentCondition, {
  None: 'Nenhum',
  CashOption: 'Pagamento á Vista',
  NonCashOption: 'Pagamento á Prazo',
});
