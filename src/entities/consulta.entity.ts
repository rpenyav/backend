import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tratamiento } from './tratamiento.entity';
import { ProductoAplicado } from './producto-aplicado.entity';
import { Candidato } from './candidato.entity';

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPaciente: number;

  @Column()
  idCliente: number;

  @Column()
  motivoConsulta: string;

  @Column('longtext')
  descripcionConsulta: string;

  @Column('datetime')
  fechaConsulta: Date;

  @Column('longtext')
  anamnesisConsulta: string;

  @Column()
  eog_mucosas: string;

  @Column()
  eog_temperatura: string;

  @Column()
  eog_peso: string;

  @Column()
  eog_condicioncorporal: string;

  @Column({
    type: 'enum',
    enum: ['alerta', 'deprimido', 'estuporoso', 'comatoso'],
  })
  eog_estadoSensorio: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eog_hidratacion: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_piel: string;

  @Column()
  eop_piel_observaciones: number;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_ojos: string;

  @Column()
  eop_ojos_observaciones: number;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_oidos: string;

  @Column()
  eop_oidos_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_sisdigestivo: string;

  @Column()
  eop_sisdigestivo_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_cardiovascular: string;

  @Column()
  eop_cardiovascular_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_respiratorio: string;

  @Column()
  eop_respiratorio_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_urinario: string;

  @Column()
  eop_urinario_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_nervioso: string;

  @Column()
  eop_nervioso_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_linfatico: string;

  @Column()
  eop_linfatico_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_locomotor: string;

  @Column()
  eop_locomotor_observaciones: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'anormal', 'no explorado'],
  })
  eop_reproductor: string;

  @Column()
  eop_reproductor_observaciones: string;

  @Column('longtext')
  diagnosticoConsulta: string;

  @Column('longtext')
  observacionesConsulta: string;

  @Column('datetime')
  proximoControlConsulta: Date;

  @OneToMany(() => Tratamiento, (tratamiento) => tratamiento.consulta)
  tratamientos: Tratamiento[];

  @OneToMany(
    () => ProductoAplicado,
    (productoAplicado) => productoAplicado.consulta,
  )
  productosAplicados: ProductoAplicado[];

  @OneToMany(() => Candidato, (candidato) => candidato.consulta)
  candidatos: Candidato[];
}
