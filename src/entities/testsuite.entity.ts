// src/entities/testsuite.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestSuite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sectionTest: string;

  @Column()
  linkTest: string;

  @Column()
  screenshotTest: string;

  @Column()
  numberTest: string;

  @Column()
  titleTest: string;

  @Column()
  descriptionTest: string;

  @Column()
  dateTest: string;

  @Column()
  testCreator: string;
}
