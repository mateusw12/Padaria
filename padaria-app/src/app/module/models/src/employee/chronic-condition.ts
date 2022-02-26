export enum ChronicCondition {
  None = 0,
  HighCholesterol = 1,
  Diabetes = 2,
  Hypertension = 3,
  Osteoporosis = 4,
  ParkinsonsDisease = 5,
  Cancer = 6,
  Others = 7,
}

export const chronicCondition = new Map<ChronicCondition, string>([
  [ChronicCondition.None, 'Nenhum'],
  [ChronicCondition.HighCholesterol, 'Colesterol Alto'],
  [ChronicCondition.Diabetes, 'Diabete'],
  [ChronicCondition.Hypertension, 'Hipertensão'],
  [ChronicCondition.Osteoporosis, 'Osteoporose'],
  [ChronicCondition.ParkinsonsDisease, 'Mal de Parkinson'],
  [ChronicCondition.Cancer, 'Câncer'],
  [ChronicCondition.Others, 'Outros'],
]);
