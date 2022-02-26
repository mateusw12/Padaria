export enum MaritalStatus {
  None = 0,
  Single = 1,
  Married = 2,
  Spouse = 3,
  Divorced = 4,
  Widowed = 5,
}

export const maritalStatus = new Map<MaritalStatus, string>([
  [MaritalStatus.None, 'Nenhum'],
  [MaritalStatus.Single, 'Solteiro'],
  [MaritalStatus.Married, 'Casado'],
  [MaritalStatus.Spouse, 'Cônjuge'],
  [MaritalStatus.Divorced, 'Divorciado'],
  [MaritalStatus.Widowed, 'Viúvo'],
]);
