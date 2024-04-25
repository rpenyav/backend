// src/entities/testsuite.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comments } from './comments.entity';

@Entity()
export class TestSuite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

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

  @Column()
  testConditions: string;

  @Column()
  testResult: string;

  @Column()
  testPriority: string;

  @Column()
  testStatus: string;

  @OneToMany(() => Comments, (comment) => comment.testSuite)
  comments: Comments[];
}
