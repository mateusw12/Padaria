import { Enum } from '../../src';

declare type EnumDescription<T> = {
  [key in keyof T]: string;
};
interface EnumDescriptor<T> {
  readonly description: EnumDescription<T>;
  readonly flags: boolean;
}
export declare function getDescriptor<T>(
  enumeration: Enum<T>
): EnumDescriptor<T> | undefined;
export declare function describe<T>(
  enumeration: Enum<T>,
  description: EnumDescription<T>,
  flags?: boolean
): void;
export {};
