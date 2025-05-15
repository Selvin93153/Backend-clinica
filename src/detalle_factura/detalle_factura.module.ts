import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFacturaService } from './detalle_factura.service';
import { DetalleFacturaController } from './detalle_factura.controller';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { Factura } from '../facturas/entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleFactura, Factura])],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
})
export class DetalleFacturaModule {}
