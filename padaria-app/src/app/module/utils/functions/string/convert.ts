import { isNil } from "@module/utils/internal";

export function convert(value: unknown): string {
  if (isNil(value)) return '';
  return String(value);
}
