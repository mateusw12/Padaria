import { describe } from '@module/utils/functions/enum';

export enum InventoryStatus {
  None = 0,
  Low = 1,
  Out = 2,
  Normal = 3,
}

describe(InventoryStatus, {
  None: 'Nenhum',
  Low: 'Baixo',
  Out: 'Sem estoque',
  Normal: 'Normal',
});
