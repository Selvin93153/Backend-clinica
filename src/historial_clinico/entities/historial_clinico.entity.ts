import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('historial_clinico')
export class HistorialClinico {
  @PrimaryGeneratedColumn()
  id_historial: number;

@ManyToOne(() => Paciente, paciente => paciente.historiales)
@JoinColumn({ name: 'id_paciente' })
paciente: Paciente;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({ type: 'text' })
  tratamiento: string;

  @Column({ type: 'timestamp' })
  fecha_registro: Date;
}
