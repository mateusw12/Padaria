import { GridComponent } from "@syncfusion/ej2-angular-grids";
/**
 *  Função que busca os dados da linha clicada no grid
 *  Retorna as informaçãoes em formato de objeto, tendo que fazer a "tipagem" no próprio componente
 * @param target 
 * @returns 
 */
export function getRowDataByTarget(target: HTMLElement) {
  const row = target.closest('tr');
  let grid!: GridComponent;
  if (!row) return undefined;
  return grid.getRowInfo(row).rowData 
}
