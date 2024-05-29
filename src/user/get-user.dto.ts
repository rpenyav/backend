// src/get-user.dto.ts
export class UserDto {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  address: string;
  postalcode: string;
  phone1: string;
  phone2: string;
  especialidad: string;
  startDate?: Date;
  role: string;
  isActive: boolean;
}
