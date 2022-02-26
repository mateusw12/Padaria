export enum LevelSchooling {
  None = 0,
  IncompleteHigherEducation = 1,
  CompleteHigherEducation = 2,
  IncompleteSchoolLevel = 3,
  CompleteSchoolLevel = 4,
  PostGraduation = 5,
}

export const levelSchooling = new Map<LevelSchooling, string>([
  [LevelSchooling.None, 'Nenhum'],
  [LevelSchooling.IncompleteSchoolLevel, 'Enisno Médio Incompleto'],
  [LevelSchooling.CompleteSchoolLevel, 'Enisno Médio Completo'],
  [LevelSchooling.IncompleteHigherEducation, 'Ensino Superior Incompleto'],
  [LevelSchooling.CompleteHigherEducation, 'Ensino Superior Completo'],
  [LevelSchooling.PostGraduation, 'Pós-Graduação'],
]);
