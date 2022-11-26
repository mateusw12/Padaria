import {Nilable } from "@module/utils/internal";

export function trim(value: Nilable<string>, trimChars?: string): string {
  if (trimChars === undefined) {
    return String(value).trim();
  } else {
    const chars = escape(trimChars);
    const pattern = new RegExp(`(^[${chars}]+)|([${chars}]+$)`, 'gs');
    return String(value).replace(pattern, '');
  }
}
