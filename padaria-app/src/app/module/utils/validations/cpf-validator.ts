/**
 * 
 * Validação de CPF, recebe um cpf e retorno se está valido ou não
 * 
 * @param value 
 * @returns 
 */

export function isValidCPF(value: string): boolean {
  if (typeof value !== 'string') return false;
  const cpf = value.replace(/[\s.-]*/gim, '');
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    return false;
  }
  var add = 0;
  var result;
  for (var i = 1; i <= 9; i++)
    add = add + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  result = (add * 10) % 11;
  if (result == 10 || result == 11) result = 0;
  if (result != parseInt(cpf.substring(9, 10))) return false;
  add = 0;
  for (var i = 1; i <= 10; i++)
    add = add + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  result = (add * 10) % 11;
  if (result == 10 || result == 11) result = 0;
  if (result != parseInt(cpf.substring(10, 11))) return false;
  return true;
}
