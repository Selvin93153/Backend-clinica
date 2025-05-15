import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  create(dto: CreateInventarioDto) {
    const nuevo = this.inventarioRepository.create(dto);
    return this.inventarioRepository.save(nuevo);
  }

  findAll() {
    return this.inventarioRepository.find();
  }

  async findOne(id: number) {
    const item = await this.inventarioRepository.findOneBy({ id_inventario: id });
    if (!item) throw new NotFoundException(`Inventario ID ${id} no encontrado`);
    return item;
  }

  async update(id: number, dto: UpdateInventarioDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.inventarioRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.inventarioRepository.remove(item);
  }
}
