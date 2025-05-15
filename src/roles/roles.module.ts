import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/roles.entity'; // Si tienes una entidad de roles

@Module({
  imports: [TypeOrmModule.forFeature([Rol])], // Se importa la entidad de roles
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService], // Si necesitas exportar el servicio para usarlo en otros módulos
})
export class RolesModule {}
