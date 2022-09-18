import { ChronicCondition } from '../employee/chronic-condition';
import { Gender } from '../employee/gender';
import { LevelSchooling } from '../employee/level-schooling';
import { MaritalStatus } from '../employee/marital-status';

export class EmployeeQuery {
  employeeId: number = 0;
  jobId: number = 0;
  employeeName: string = '';
  gender: Gender = Gender.None;
  cpf: string = '';
  maritalStatus: MaritalStatus[] = []
  chronicCondition: ChronicCondition[] = [];
  levelSchooling: LevelSchooling[]= [];
  phone: string = '';
  workingHours: number = 0;
  city: string = '';
  hourlyWork: number = 0;
  street: string = '';
}
