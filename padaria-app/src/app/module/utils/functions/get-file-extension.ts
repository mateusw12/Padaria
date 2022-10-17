import { FileExtensions } from "@module/models";
import { toArray } from "./enum";

export function getFileExtension(fileName: string): FileExtensions {
  const fileExtension = fileName.split('.').pop();
  if (!fileExtension) return FileExtensions.None;
  const extension = toArray(FileExtensions).find(
    (el) => el.description === `.${fileExtension.toLowerCase()}`
  );
  return extension ? extension.value : FileExtensions.None;
}
