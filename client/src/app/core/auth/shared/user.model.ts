import {Roles} from './roles';

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  name: string;
  roles: Roles;
}
