import { Enum } from '../interfaces';

/**
 *  
 * Função que tranforma uma classe de Enum, retornando em uma lista de Enuns para ser utilizado 
 * 
 * @param enumeration 
 * @returns 
 */

export function getEnumArray(enumeration: Map<any, string>): Enum[] {
  const enumItems: Enum[] = [];
  for (const item of enumeration) {
    enumItems.push({
      value: item[0],
      description: item[1],
    });
  }
  return enumItems.filter((el) => el.value !== 0);
}

/**
 * 
 * Função que transforma um Map de classe Enum, retornando a descrição do mesmo
 * 
 * @param enumeration 
 * @param value 
 * @returns 
 */
export function getEnumDescription(
  enumeration: Map<any, string>,
  value: number
): string {
  let description = '';
  for (const item of enumeration) {
    if (item[0] === value) description = item[1] as string;
  }
  return description;
}
