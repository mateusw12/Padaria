import { describe } from '@module/utils/functions/enum';

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

describe(ChronicCondition, {
  None: 'Nenhum',
  HighCholesterol: 'Colesterol Alto',
  Diabetes: 'Diabete',
  Hypertension: 'Hipertensão',
  Osteoporosis: 'Osteoporose',
  ParkinsonsDisease: 'Mal de Parkinson',
  Cancer: 'Câncer',
  Others: 'Outros',
});
