export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}

export interface PublicUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}
