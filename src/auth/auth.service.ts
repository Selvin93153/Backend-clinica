import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async login(correo: string, password: string) {
    const user = await this.usuariosService.findByCorreo(correo);
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // Aquí podrías devolver un JWT si lo deseas
    return {
      mensaje: 'Inicio de sesión exitoso',
      user: {
        id: user.id_usuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
     
      },
    };
  }
}
