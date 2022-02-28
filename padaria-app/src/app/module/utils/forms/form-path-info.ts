import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { isString } from 'lodash';

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

  isEmpty(): boolean {
    return this.path.length === 0;
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
  let parent: FormGroup | FormArray | null = child.parent;
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
      throw new Error('O caminho do controle não foi encontrado.');
    }
    path.push(name);
    child = parent;
    parent = child.parent;
  }
  return new FormPathInfo(path.reverse());
}
