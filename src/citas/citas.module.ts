import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Cita } from './entities/citas.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Paciente, Medico])],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
