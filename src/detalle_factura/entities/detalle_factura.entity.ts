import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from '../../facturas/entities/factura.entity';

@Entity('detalle_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn({ name: 'id_detalle' })
  id_detalle: number;

  @ManyToOne(() => Factura, (factura) => factura.detalles, { eager: true })
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  cantidad: number;

  @Column({ type: 'decimal' })
  precio_unitario: number;
}
