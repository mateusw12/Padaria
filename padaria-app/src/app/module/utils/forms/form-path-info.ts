import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { isString } from '../internal';

const PATH_SEPARATOR = '.';

export type FormPath = string | (string | number)[];

export class FormPathInfo {

  private path: string[];

  constructor(path: FormPath) {
    if (isString(path)) {
      this.path = path.split(PATH_SEPARATOR);
    } else {
      this.path = path.map(String);
    }
  }

  getPath(): Readonly<string[]> {
    return this.path;
  }

  getRawPath(): string {
    return this.path.join(PATH_SEPARATOR);
  }

  isPath(path: (string | number)[]): boolean {
    if (this.path.length !== path.length) return false;
    return this.path.every((value, index) => value === String(path[index]));
  }

}

export function getControlPath(control: AbstractControl): FormPathInfo {
  const path: FormPath = [];
  let child: AbstractControl = control;
  let parent: FormGroup | FormArray = child.parent!;
  while (parent) {
    let name: string | number | undefined;
    if (parent instanceof FormGroup) {
      const keys = Object.keys(parent.controls);
      for (const key of keys) {
        if (parent.controls[key] === child) {
          name = key;
          break;
        }
      }
    } else {
      name = parent.controls.indexOf(child);
    }
    if (name === undefined) {
      return new FormPathInfo(path.reverse())
    }
    path.push(name);
    child = parent;
    parent = child.parent!;
  }
  return new FormPathInfo(path.reverse());
}
