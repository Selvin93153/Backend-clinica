import { IsNotEmpty, IsInt, IsDateString, IsString, IsIn } from 'class-validator';

export class CreateCitaDto {
  @IsNotEmpty()
  @IsInt()
  id_paciente: number;

  @IsNotEmpty()
  @IsInt()
  id_medico: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string; // YYYY-MM-DD

  @IsNotEmpty()
  @IsString()
  hora: string; // HH:MM:SS

  @IsNotEmpty()
  @IsString()
  @IsIn(['pendiente', 'completada', 'cancelada'])
  estado: string;
}
