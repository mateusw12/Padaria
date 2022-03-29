/**
 * Modos de usar:
 *
 * Criar uma variavel "Dictionary"
 * const varDictionary = this.toDictionary<T>(lista);
 *
 * Criar uma variavel que receberá a variavel de dicionário passando como chave valor o "variavel: number"
 * const var = varyDictionary[id:number];
 *
 * Vantagens de se usar dicionário em várias requisições em uma só vez, ele é mais rápido do que um array.find()
 * podendo ganhar milissegundos ou segundos ao completar a função
 *
 * Função que recebe uma lista do tipo T com um valor de identificador numeral, retornando um dicionario chave valor do tipo T
 * 
 * @param list
 * @returns
 */

export function toDictionary<T extends { id: number }>(list: T[]): { [id: number]: T } {
    const dictionary: { [id: number]: T } = {};
    for (const item of list) {
      dictionary[item.id] = item as T;
    }
    return dictionary;
}
