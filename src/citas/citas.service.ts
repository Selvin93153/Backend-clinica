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
    const paciente = await this.pacienteRepository.findOne({
      where: { id_paciente: createCitaDto.id_paciente },
    });

    const medico = await this.medicoRepository.findOne({
      where: { id_medico: createCitaDto.id_medico },
    });

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

  async findAll(): Promise<Cita[]> {
    return this.citaRepository.find({
      relations: {
        paciente: {
          usuario: true, // 👈 Relación agregada para traer datos del usuario del paciente
        },
        medico: {
          usuario: true, // Ya funcional, se conserva
        },
      },
    });
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id_cita: id },
      relations: {
        paciente: {
          usuario: true,
        },
        medico: {
          usuario: true,
        },
      },
    });

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
