import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn({ name: 'id_cita' })
  id_cita: number;

  @ManyToOne(() => Paciente, { eager: true })
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @ManyToOne(() => Medico, { eager: true })
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;

  @Column({ type: 'date' })
  fecha: string; // formato YYYY-MM-DD

  @Column({ type: 'time' })
  hora: string; // formato HH:MM:SS

  @Column({ length: 20 })
  estado: string;
}
