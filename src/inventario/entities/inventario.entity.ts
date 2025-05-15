import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column('int')
  cantidad: number;

  @Column({ type: 'date' })
  fecha_ingreso: string;

  @Column({ type: 'varchar', length: 50 })
  estado: string; // Ej: disponible, dañado, vencido, etc.
}
