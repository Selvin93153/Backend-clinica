import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialClinico } from './entities/historial_clinico.entity';
import { CreateHistorialClinicoDto } from './dto/create-historial_clinico.dto';
import { UpdateHistorialClinicoDto } from './dto/update-historial_clinico.dto';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Injectable()
export class HistorialClinicoService {
  constructor(
    @InjectRepository(HistorialClinico)
    private historialRepository: Repository<HistorialClinico>,

    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(dto: CreateHistorialClinicoDto): Promise<HistorialClinico> {
    const paciente = await this.pacienteRepository.findOne({ where: { id_paciente: dto.id_paciente } });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const historial = this.historialRepository.create({
      ...dto,
      paciente,
      fecha_registro: new Date(dto.fecha_registro),
    });

    return this.historialRepository.save(historial);
  }

  async findAll(): Promise<HistorialClinico[]> {
    return this.historialRepository.find({
      relations: {
        paciente: {
          usuario: true, // 👈 Se incluye el usuario relacionado al paciente
        },
      },
    });
  }

  async findOne(id: number): Promise<HistorialClinico> {
    const historial = await this.historialRepository.findOne({
      where: { id_historial: id },
      relations: {
        paciente: {
          usuario: true,
        },
      },
    });

    if (!historial) {
      throw new NotFoundException('Historial no encontrado');
    }

    return historial;
  }

  async update(id: number, dto: UpdateHistorialClinicoDto): Promise<HistorialClinico> {
    const historial = await this.findOne(id);
    const paciente = dto.id_paciente
      ? await this.pacienteRepository.findOne({ where: { id_paciente: dto.id_paciente } })
      : historial.paciente;

    if (dto.id_paciente && !paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    Object.assign(historial, dto, { paciente });
    return this.historialRepository.save(historial);
  }

  async remove(id: number): Promise<void> {
    const result = await this.historialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Historial no encontrado');
    }
  }
}
