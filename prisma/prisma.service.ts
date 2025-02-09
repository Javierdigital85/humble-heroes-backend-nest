import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // Conecta a la base de datos al iniciar el módulo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta al destruir el módulo
  }

  // Método para limpiar la base de datos en pruebas
  async cleanDatabase() {
    await this.hero.deleteMany(); // Elimina todos los registros de la tabla 'hero'
  }
}
