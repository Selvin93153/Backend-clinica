import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialClinicoService } from './historial_clinico.service';
import { HistorialClinicoController } from './historial_clinico.controller';
import { HistorialClinico } from './entities/historial_clinico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialClinico, Paciente])],
  controllers: [HistorialClinicoController],
  providers: [HistorialClinicoService],
})
export class HistorialClinicoModule {}
