import { describe } from '@module/utils/functions/enum';

export enum Gender {
  None = 0,
  Male = 1,
  Female = 2,
  Other = 3,
}

describe(Gender, {
  None: 'Nenhum',
  Male: 'Masculino',
  Female: 'Feminino',
  Other: 'Outro',
});
