import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Cita } from '../../citas/entities/citas.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn({ name: 'id_medico' })
  id_medico: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 100 })
  especialidad: string;

  @Column({ length: 20 })
  telefono: string;

   @OneToMany(() => Cita, (cita) => cita.medico)
  citas: Cita[];
}
