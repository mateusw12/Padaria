import { Enum } from "@module/utils/internal";

const enumDescriptorSymbol = Symbol('enumDescriptor');

type EnumDescription<T> = { [key in keyof T]: string };

interface EnumDescriptor<T> {
  readonly description: EnumDescription<T>;
  readonly flags: boolean;
}

interface EnumDescriptorAccessor<T> {
  [enumDescriptorSymbol]?: EnumDescriptor<T>;
}

export function getDescriptor<T>(enumeration: Enum<T>): EnumDescriptor<T> | undefined {
  return (enumeration as EnumDescriptorAccessor<T>)[enumDescriptorSymbol];
}

export function describe<T>(enumeration: Enum<T>, description: EnumDescription<T>, flags = false): void {
  (enumeration as EnumDescriptorAccessor<T>)[enumDescriptorSymbol] = { description, flags };
}
