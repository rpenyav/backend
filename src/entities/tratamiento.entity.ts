import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Consulta } from './consulta.entity';

@Entity('tratamientos') // Nombre de la tabla en plural
export class Tratamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  dosis: string;

  @ManyToOne(() => Consulta, (consulta) => consulta.tratamientos, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;
}
