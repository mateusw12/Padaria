import { describe } from '@module/utils/functions/enum';

export enum UserRole {
  None = 0,
  Administrator = 1,
  Employee = 2,
  Manager = 3,
}

describe(UserRole, {
  None: 'Nenhum',
  Administrator: 'Administrador',
  Employee: 'Funcionário',
  Manager: 'Gestor',
});
