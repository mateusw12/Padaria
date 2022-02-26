import { ChronicCondition } from './chronic-condition';
import { Gender } from './gender';
import { LevelSchooling } from './level-schooling';
import { MaritalStatus } from './marital-status';

export class Employee {
  id: number = 0;
  workingHours: number = 0;
  hourlyWork: number = 0;
  jobId: number = 0;
  birthDate: Date = new Date();
  admissionDate: Date = new Date();
  gender: Gender = Gender.None;
  maritalStatus: MaritalStatus = MaritalStatus.None;
  chronicCondition: ChronicCondition[] = [];
  levelSchooling: LevelSchooling = LevelSchooling.None;
  zipCodeAddresses: string = '';
  street: string = '';
  district: string = '';
  city: string = '';
  state: string = '';
  phone: string = '';
  email: string = '';
  name: string = '';
  cpf: string = '';
}
