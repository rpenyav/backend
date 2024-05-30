import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Consulta } from './consulta.entity';

@Entity('productos_aplicados') // Nombre de la tabla en plural
export class ProductoAplicado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column()
  cantidad: string;

  @ManyToOne(() => Consulta, (consulta) => consulta.productosAplicados, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;
}
