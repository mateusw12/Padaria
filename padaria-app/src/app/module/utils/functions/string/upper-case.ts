import { getString, Nilable } from "@module/utils/internal";

export function upperCase(value: Nilable<string>): string {
  return getString(value).toUpperCase();
}
