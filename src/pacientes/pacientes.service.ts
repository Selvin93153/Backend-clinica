import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>
  ) {}

  async create(dto: CreatePacienteDto) {
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
    const paciente = this.pacienteRepo.create({
      ...dto,
      usuario,
    });
    return this.pacienteRepo.save(paciente);
  }

  findAll() {
    return this.pacienteRepo.find({ relations: ['usuario'] });
  }

  findOne(id: number) {
    return this.pacienteRepo.findOne({
      where: { id_paciente: id },
      relations: ['usuario'],
    });
  }

  async update(id: number, dto: UpdatePacienteDto) {
    await this.pacienteRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.pacienteRepo.delete(id);
  }
}
