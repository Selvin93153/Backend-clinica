import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';
import { Factura } from '../facturas/entities/factura.entity';

@Injectable()
export class DetalleFacturaService {
  constructor(
    @InjectRepository(DetalleFactura)
    private detalleFacturaRepository: Repository<DetalleFactura>,

    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
  ) {}

  async create(dto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
    const factura = await this.facturaRepository.findOneBy({ id_factura: dto.id_factura });
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    const detalle = this.detalleFacturaRepository.create({
      ...dto,
      factura,
    });

    return this.detalleFacturaRepository.save(detalle);
  }

  findAll(): Promise<DetalleFactura[]> {
    return this.detalleFacturaRepository.find();
  }

  async findOne(id: number): Promise<DetalleFactura> {
    const detalle = await this.detalleFacturaRepository.findOneBy({ id_detalle: id });
    if (!detalle) throw new NotFoundException(`Detalle con id ${id} no encontrado`);
    return detalle;
  }

  async update(id: number, dto: UpdateDetalleFacturaDto): Promise<DetalleFactura> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, dto);
    return this.detalleFacturaRepository.save(detalle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.detalleFacturaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Detalle con id ${id} no encontrado`);
    }
  }
}
