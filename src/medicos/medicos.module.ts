import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Usuario])],
  controllers: [MedicosController],
  providers: [MedicosService],
})
export class MedicosModule {}
