import { describe } from '@module/utils/functions/enum';

export enum FileExtensions {
  None = 0,
  Doc = 1,
  Docx = 2,
  Rtf = 3,
  Pdf = 4,
  Csv = 5,
  Dot = 6,
  Dotm = 7,
  Dotx = 8,
  Eml = 9,
}

describe(FileExtensions, {
  None: '',
  Doc: '.doc',
  Docx: '.docx',
  Rtf: '.rtf',
  Pdf: '.pdf',
  Csv: '.csv',
  Dot: '.dot',
  Dotm: '.dotm',
  Dotx: '.dotx',
  Eml: '.eml',
});
