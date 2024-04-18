import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Esto indica que la clase es una entidad de base de datos.
export class User {
  @PrimaryGeneratedColumn() // Esto indica que esta columna es un ID generado automáticamente.
  id: number;

  @Column() // Esto define una columna normal en la tabla.
  name: string;

  @Column() // Otra columna normal.
  age: number;

  @Column() // Esto añade una columna para la contraseña del usuario.
  password: string;

  @Column({ unique: true }) // Asegúrate de que el email sea único
  email: string;
}
