export interface ActiveUser {
  forEach(arg0: (user: any) => void): unknown;
  name: string;
  email: string;
  password: string;
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number | null;
}


