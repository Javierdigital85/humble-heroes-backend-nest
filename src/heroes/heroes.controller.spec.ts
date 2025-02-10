import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('HeroesController', () => {
  let heroesController: HeroesController;
  let heroesService: HeroesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [HeroesService, PrismaService],
    }).compile();

    heroesController = module.get<HeroesController>(HeroesController);
    heroesService = module.get<HeroesService>(HeroesService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.cleanDatabase();
  });

  it('should create a new superhero', async () => {
    const createHeroDto = {
      name: 'Superman',
      superpower: 'Flying',
      humilityScore: 7,
    };

    const result = await heroesController.create(createHeroDto);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'Superman',
        superpower: 'Flying',
        humilityScore: 7,
      }),
    );

    expect(result.id).toBeDefined();
  });

  it('should return an array of superheroes', async () => {
    const result = [
      { id: 1, name: 'Superman', superpower: 'Flying', humilityScore: 7 },
      { id: 2, name: 'Batman', superpower: 'Martial Arts', humilityScore: 8 },
    ];

    const findAllSpy = jest
      .spyOn(heroesService, 'findAll')
      .mockResolvedValue(result);

    const heroes = await heroesController.findAll();

    expect(findAllSpy).toHaveBeenCalled();

    expect(heroes).toEqual(result);
    expect(heroes).toBeInstanceOf(Array);
    expect(heroes.length).toBeGreaterThan(0);
  });
});
