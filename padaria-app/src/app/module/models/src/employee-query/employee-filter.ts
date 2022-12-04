import { Gender } from '../employee/gender';
import { LevelSchooling } from '../employee/level-schooling';
import { MaritalStatus } from '../employee/marital-status';

export class EmployeeQueryFilter {
  employeeIds: number[] = [];
  gender: Gender[] = [];
  maritalStatus: MaritalStatus[] = [];
  levelSchooling: LevelSchooling[] = [];
  admissionDate: Date | null = null;
  jobIds: number[] = [];
  city: string = '';
  states: string[] = [];
}
