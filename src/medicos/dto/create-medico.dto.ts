import { IsNotEmpty, IsString, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty()
  @IsInt()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  especialidad: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  telefono: string;
}
