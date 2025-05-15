import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/citas.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,

    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,

    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const paciente = await this.pacienteRepository.findOneBy({ id_paciente: createCitaDto.id_paciente });
    const medico = await this.medicoRepository.findOneBy({ id_medico: createCitaDto.id_medico });

    if (!paciente || !medico) {
      throw new NotFoundException('Paciente o médico no encontrado');
    }

    const cita = this.citaRepository.create({
      paciente,
      medico,
      fecha: createCitaDto.fecha,
      hora: createCitaDto.hora,
      estado: createCitaDto.estado,
    });

    return this.citaRepository.save(cita);
  }

  findAll(): Promise<Cita[]> {
    return this.citaRepository.find();
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citaRepository.findOneBy({ id_cita: id });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async remove(id: number): Promise<void> {
    const result = await this.citaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
  }
}
