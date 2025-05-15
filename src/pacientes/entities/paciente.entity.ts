import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cita } from 'src/citas/entities/citas.entity';
import { HistorialClinico } from 'src/historial_clinico/entities/historial_clinico.entity';
import { Factura } from 'src/facturas/entities/factura.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pacientes)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(() => Cita, (cita) => cita.paciente)
citas: Cita[];

@OneToMany(() => HistorialClinico, (historial) => historial.paciente)
historiales: HistorialClinico[];

@OneToMany(() => Factura, (factura) => factura.paciente)
facturas: Factura[];

  @Column({ type: 'date' })
  fecha_nac: string;

  @Column('text')
  direccion: string;

  @Column({ length: 20 })
  telefono: string;

}
