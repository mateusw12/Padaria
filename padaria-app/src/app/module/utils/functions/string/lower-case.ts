import { Nilable } from "@module/utils/internal";

export function lowerCase(value: Nilable<string>): string {
  return String(value).toLowerCase();
}
