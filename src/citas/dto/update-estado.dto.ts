// src/citas/dto/update-estado.dto.ts
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class UpdateEstadoDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['pendiente', 'completada', 'cancelada'])
  estado: string;
}
