import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsNotEmpty()
  @IsInt()
  id_factura: number;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  precio_unitario: number;
}
