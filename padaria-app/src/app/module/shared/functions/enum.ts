export interface Enum {
  value: number;
  description: string;
}

export function enumToArray(enumeration: Map<any, string>): Enum[] {
  const enumItems: Enum[] = [];
  for (const item of enumeration) {
    enumItems.push({
      value: item[0],
      description: item[1],
    });
  }
  return enumItems.filter((el) => el.value !== 0);
}

export function EnumDescription(
  enumeration: Map<any, string>,
  value: number
): string {
  let description = '';
  for (const item of enumeration) {
    if (item[0] === value) description = item[1] as string;
  }
  return description;
}
