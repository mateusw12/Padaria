import { mustValidator } from './must-validator';
import { urlValidator } from './url-validator';

export const FormValidators = {
  url: urlValidator,
  must: mustValidator,
};
