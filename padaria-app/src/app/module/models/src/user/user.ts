import { UserRole } from './user-role';

export class User {
  id: number = 0;
  name: string = '';
  userName: string = '';
  password: string = '';
  email: string = '';
  isActive: boolean = false;
  role: UserRole = UserRole.None;
}
