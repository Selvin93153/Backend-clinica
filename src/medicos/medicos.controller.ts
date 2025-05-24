import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicosService.findOne(+id);
  }

   @Patch(':id')  // <-- NUEVO método PATCH para actualizar
  update(
    @Param('id') id: string,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    return this.medicosService.update(+id, updateMedicoDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(+id);
  }
}
