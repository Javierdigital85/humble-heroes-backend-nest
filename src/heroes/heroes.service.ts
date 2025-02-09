import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class HeroesService extends PrismaClient {
  async create(createHeroDto: CreateHeroDto) {
    const heroFound = await this.hero.findFirst({
      where: { name: createHeroDto.name },
    });
    if (heroFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.hero.create({
      data: createHeroDto,
    });
  }

  findAll() {
    return this.hero.findMany({
      orderBy: {
        humilityScore: 'desc',
      },
    });
  }
}
