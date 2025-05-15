import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  id_usuario: number;

  @IsDateString()
  fecha_nac: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsString()
  @Length(7, 20)
  telefono: string;
}
