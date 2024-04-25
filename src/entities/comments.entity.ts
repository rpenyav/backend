// src/entities/comment.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestSuite } from './testsuite.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  commentText: string;

  @Column()
  commenterEmail: string;

  @Column()
  commenterName: string;

  @Column()
  testSuiteId: number;

  @Column()
  commentCreatedAt: string;

  @ManyToOne(() => TestSuite, (testSuite) => testSuite.comments)
  @JoinColumn({ name: 'testSuiteId' })
  testSuite: TestSuite;
}
