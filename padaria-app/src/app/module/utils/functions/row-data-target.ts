import { GridComponent } from "@syncfusion/ej2-angular-grids";
/**
 *
 * função que busca o valor da linha do grid, retornando um objeto, tendo assim que fazer a tipagem manualmente
 *
 * @param target
 * @param grid
 * @returns
 */
export function getRowDataByTarget(target: HTMLElement, grid: GridComponent): object {
  return grid.getRowInfo(target).rowData  as object
}
