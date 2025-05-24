import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';  // Importa la entidad Usuario
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,

    @InjectRepository(Usuario)  // Inyecta el repositorio Usuario
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    // Busca el usuario por id
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: createMedicoDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crea el médico asignando el usuario completo
    const medico = this.medicoRepository.create({
      especialidad: createMedicoDto.especialidad,
      telefono: createMedicoDto.telefono,
      usuario, // asigna la relación correctamente
    });

    return this.medicoRepository.save(medico);
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOneBy({ id_medico: id });
    if (!medico) {
      throw new NotFoundException(`Médico con id ${id} no encontrado`);
    }
    return medico;
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Médico con id ${id} no encontrado`);
    }
  }



  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
  const medico = await this.medicoRepository.findOneBy({ id_medico: id });

  if (!medico) {
    throw new NotFoundException(`Médico con id ${id} no encontrado`);
  }

  // Si el update incluye id_usuario, debes actualizar la relación usuario también
  if (updateMedicoDto.id_usuario) {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: updateMedicoDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    medico.usuario = usuario;
  }

  // Actualiza las otras propiedades si vienen en el DTO
  if (updateMedicoDto.especialidad !== undefined) {
    medico.especialidad = updateMedicoDto.especialidad;
  }
  if (updateMedicoDto.telefono !== undefined) {
    medico.telefono = updateMedicoDto.telefono;
  }

  return this.medicoRepository.save(medico);
}

}
