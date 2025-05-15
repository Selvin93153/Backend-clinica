import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificacionDto {
  @IsNotEmpty()
  @IsString()
  mensaje: string;

  @IsOptional()
  @IsBoolean()
  leida?: boolean;

  @IsNotEmpty()
  id_usuario: number;
}
