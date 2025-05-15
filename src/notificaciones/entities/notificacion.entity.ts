import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @Column('text')
  mensaje: string;

  @Column({ type: 'boolean', default: false })
  leida: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
