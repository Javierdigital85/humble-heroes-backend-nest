import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './create-hero.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
