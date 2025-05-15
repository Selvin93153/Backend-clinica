import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialClinicoService } from './historial_clinico.service';
import { CreateHistorialClinicoDto } from './dto/create-historial_clinico.dto';
import { UpdateHistorialClinicoDto } from './dto/update-historial_clinico.dto';

@Controller('historial-clinico')
export class HistorialClinicoController {
  constructor(private readonly service: HistorialClinicoService) {}

  @Post()
  create(@Body() dto: CreateHistorialClinicoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHistorialClinicoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
