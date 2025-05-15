import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const paciente = await this.pacienteRepository.findOneBy({
      id_paciente: createFacturaDto.id_paciente,
    });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const factura = this.facturaRepository.create({
      ...createFacturaDto,
      paciente,
    });

    return this.facturaRepository.save(factura);
  }

  findAll(): Promise<Factura[]> {
    return this.facturaRepository.find();
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { id_factura: id },
    });

    if (!factura) {
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
  const factura = await this.facturaRepository.preload({
    id_factura: id,
    ...updateFacturaDto,
  });

  if (!factura) {
    throw new NotFoundException(`Factura con ID ${id} no encontrada`);
  }

  return this.facturaRepository.save(factura);
}


  async remove(id: number): Promise<void> {
    const result = await this.facturaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }
  }
}
