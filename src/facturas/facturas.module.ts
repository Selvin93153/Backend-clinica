import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, Paciente])],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
