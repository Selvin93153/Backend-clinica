import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Rol } from 'src/roles/entities/roles.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Notificacion } from '../../notificaciones/entities/notificacion.entity';


@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column()
  password: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
  rol: Rol;

  @OneToMany(() => Paciente, (paciente) => paciente.usuario)
  pacientes: Paciente[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
notificaciones: Notificacion[];

}
