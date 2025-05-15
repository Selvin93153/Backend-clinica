import { IsNotEmpty, IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateInventarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  cantidad: number;

  @IsDateString()
  fecha_ingreso: string;

  @IsString()
  estado: string;
}
