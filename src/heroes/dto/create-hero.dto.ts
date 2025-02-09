import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should no be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Superpower should no be empty' })
  superpower: string;

  @IsNumber()
  @Min(1, { message: 'Humility score must be between 1 and 10' })
  @Max(10, { message: 'Humility score must be no greater than 10' })
  humilityScore: number;
}
