export interface CreateUser {
  name: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}
