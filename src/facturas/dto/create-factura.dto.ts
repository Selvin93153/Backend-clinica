import { IsNumber, IsPositive } from 'class-validator';

export class CreateFacturaDto {
  @IsNumber()
  id_paciente: number;

  @IsNumber()
  @IsPositive()
  total: number;
}
