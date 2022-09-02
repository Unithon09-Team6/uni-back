import {Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
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

  @Get('/category')
  async getRecipesByCategory(@Query('category') category: number): Promise<Recipes[]> {
    const recipes = await this.recipesService.findByCategory(category);
    return recipes;
  }

  @Get('/search')
  async searchRecipes(@Query('target') searchingString: string): Promise<Recipes[]> {
    const searchResults = await this.recipesService.searchRecipes(searchingString);
    return searchResults;
  }

  @Post()
  async createRecipe(@Body() body): Promise<string> {
    await this.recipesService.create(body);
    return 'true';
  }

  @Put()
  async uploadRecipe(@Body() body) {
    await this.recipesService.uploadRecipe(body);
  }
}
