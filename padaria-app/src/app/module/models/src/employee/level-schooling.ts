import { describe } from '@module/utils/functions/enum';

export enum LevelSchooling {
  None = 0,
  IncompleteHigherEducation = 1,
  CompleteHigherEducation = 2,
  IncompleteSchoolLevel = 3,
  CompleteSchoolLevel = 4,
  PostGraduation = 5,
}

describe(LevelSchooling, {
  None: 'Nenhum',
  IncompleteSchoolLevel: 'Enisno Médio Incompleto',
  CompleteSchoolLevel: 'Enisno Médio Completo',
  IncompleteHigherEducation: 'Ensino Superior Incompleto',
  CompleteHigherEducation: 'Ensino Superior Completo',
  PostGraduation: 'Pós-Graduação',
});
