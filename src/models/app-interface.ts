export interface IUser {
  id: string;
  email: string;
  fullName: string | null;
  status: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}