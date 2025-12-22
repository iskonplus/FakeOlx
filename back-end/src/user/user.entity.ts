export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}
