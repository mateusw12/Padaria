export enum PaymentInstalment {
  FirstInstalment = 1,
  SecondInstalment = 2,
  ThirdInstalment = 3,
  FourInstalment = 4,
  FiveInstalment = 5,
  SixInstalment = 6,
}

export const paymentInstalment = new Map<PaymentInstalment, string>([
  [PaymentInstalment.FirstInstalment, '1° Parcela'],
  [PaymentInstalment.SecondInstalment, '2° Parcela'],
  [PaymentInstalment.ThirdInstalment, '3° Parcela'],
  [PaymentInstalment.FourInstalment, '4° Parcela'],
  [PaymentInstalment.FiveInstalment, '5° Parcela'],
  [PaymentInstalment.SixInstalment, '6° Parcela'],
]);
