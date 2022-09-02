import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipes } from './schemas/recipes.schema';

@Controller('recipes')
export class RecipesController {
  public constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll(): Promise<Recipes[]> {
    const recipes = await this.recipesService.findAll();
    return recipes;
  }
}
