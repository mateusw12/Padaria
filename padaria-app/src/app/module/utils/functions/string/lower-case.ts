import { getString, Nilable } from "@module/utils/internal";

export function lowerCase(value: Nilable<string>): string {
  return getString(value).toLowerCase();
}
