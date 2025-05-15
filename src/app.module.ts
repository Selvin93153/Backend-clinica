import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module'; // Importa el RolesModule
import { UsuariosModule } from './usuarios/usuarios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { CitasModule } from './citas/citas.module';
import { MedicosModule } from './medicos/medicos.module';
import { HistorialClinicoModule } from './historial_clinico/historial_clinico.module';
import { FacturasModule } from './facturas/facturas.module';
import { DetalleFacturaModule } from './detalle_factura/detalle_factura.module';

@Module({
  imports: [
    // Carga las variables de .env
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
    }),

    // Configura TypeORM usando las variables del .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT'), 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true, // Asegúrate de no usar esto en producción
        logging: true,
        autoLoadEntities: true,
      }),
    }),

    // Aquí importas el RolesModule
    RolesModule,
    UsuariosModule,
    PacientesModule,
    InventarioModule,
    NotificacionesModule,
    CitasModule,
    MedicosModule,
    HistorialClinicoModule,
    FacturasModule,
    DetalleFacturaModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
