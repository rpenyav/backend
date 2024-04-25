import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  projectPrefix: string;

  @Column()
  projectDescription: string;

  @Column()
  projectPriority: string;

  @Column()
  projectActive: boolean;

  @Column()
  projectIsCompleted: boolean;

  @Column()
  projectCreatedAt: string;

  @Column()
  projectCreator: string;
}
