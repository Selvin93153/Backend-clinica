import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateHistorialClinicoDto {
  @IsInt()
  id_paciente: number;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  tratamiento: string;

  @IsDateString()
  fecha_registro: string;
}
