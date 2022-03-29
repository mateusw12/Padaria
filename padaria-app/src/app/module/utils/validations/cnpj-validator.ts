/**
 * 
 * Função que realiza validação de CNPJ, recebendo um cnpj e retorno se está válido
 * 
 * @param value 
 * @returns 
 */

export function isValidCNPJ(value: string): boolean {
  if (!value) return false;

  const cnpj = typeof value === 'string';
  const validTypes =
    cnpj || Number.isInteger(value) || Array.isArray(value);

  if (!validTypes) return false;

  if (cnpj) {
    if (value.length > 18) return false;

    const digitsOnly = /^\d{14}$/.test(value);
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

    if (digitsOnly || validFormat) true;
    else return false;
  }

  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;

  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const calc = (x: number) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  const digits = numbers.slice(12);

  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  const digit1 = calc(13);
  return digit1 === digits[1];
}
