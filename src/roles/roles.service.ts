import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/roles.entity';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  create(createRolDto: CreateRolDto): Promise<Rol> {
    const nuevoRol = this.rolRepository.create(createRolDto);
    return this.rolRepository.save(nuevoRol);
  }

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  findOne(id: number): Promise<Rol> {
    return this.rolRepository.findOneBy({ id_rol: id });
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    await this.rolRepository.update(id, updateRolDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
