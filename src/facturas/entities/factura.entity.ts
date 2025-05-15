import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { DetalleFactura } from '../../detalle_factura/entities/detalle_factura.entity';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.facturas, { eager: true })
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura)
detalles: DetalleFactura[];
}
