// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: ['paciente', 'admin', 'doctor', 'cliente'] })
  role: string;

  @Column()
  address: string;

  @Column()
  postalcode: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  especialidad: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'tinyint', default: 1 })
  isActive: boolean;
}
