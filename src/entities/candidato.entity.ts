import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Consulta } from './consulta.entity';
import { User } from './user.entity';

@Entity('candidatos')
export class Candidato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consulta, (consulta) => consulta.candidatos, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;

  @ManyToOne(() => User, (user) => user.candidaturas, { onDelete: 'CASCADE' })
  user: User;

  @Column('datetime')
  fechaCandidatura: Date;
}
