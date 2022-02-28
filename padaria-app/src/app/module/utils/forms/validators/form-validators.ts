import { equalValidator } from './equal-validator';
import { mustValidator } from './must-validator';
import { notBlankValidator } from './not-blank-validator';
import { notEqualValidator } from './not-equal-validator';
import { urlValidator } from './url-validator';

export const FormValidators = {
  equal: equalValidator,
  notEqual: notEqualValidator,
  url: urlValidator,
  must: mustValidator,
  notBlank: notBlankValidator,
};
