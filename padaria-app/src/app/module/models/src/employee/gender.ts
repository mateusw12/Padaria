export enum Gender {
  None = 0,
  Male = 1,
  Female = 2,
  Other = 3,
}

export const gender = new Map<Gender, string>([
  [Gender.None, 'Nenhum'],
  [Gender.Male, 'Marculino'],
  [Gender.Female, 'Feminino'],
  [Gender.Other, 'Outro'],
]);
