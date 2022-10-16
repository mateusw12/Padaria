import { describe } from '@module/utils/functions/enum';

export enum MaritalStatus {
  None = 0,
  Single = 1,
  Married = 2,
  Spouse = 3,
  Divorced = 4,
  Widowed = 5,
}

describe(MaritalStatus, {
  None: 'Nenhum',
  Single: 'Solteiro',
  Married: 'Casado',
  Spouse: 'Cônjuge',
  Divorced: 'Divorciado',
  Widowed: 'Viúvo',
});
