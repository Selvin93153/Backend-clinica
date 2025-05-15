import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    const { mensaje, leida, id_usuario } = createNotificacionDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);

    const nuevaNotificacion = this.notificacionRepository.create({
      mensaje,
      leida: leida ?? false,
      usuario,
    });

    return this.notificacionRepository.save(nuevaNotificacion);
  }

  findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find();
  }

  async findOne(id: number): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOne({ where: { id_notificacion: id } });
    if (!notificacion) throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    return notificacion;
  }

  async update(id: number, updateNotificacionDto: UpdateNotificacionDto): Promise<Notificacion> {
    const notificacion = await this.findOne(id);
    Object.assign(notificacion, updateNotificacionDto);
    return this.notificacionRepository.save(notificacion);
  }

  async remove(id: number): Promise<void> {
    const notificacion = await this.findOne(id);
    await this.notificacionRepository.remove(notificacion);
  }
}
