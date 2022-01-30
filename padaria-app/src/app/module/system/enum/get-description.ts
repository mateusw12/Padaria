import { Enum, Nilable } from "../internal/interfaces";

export declare function getDescription<T>(
  enumeration: Enum<T>,
  value: Nilable<number>
): string;
