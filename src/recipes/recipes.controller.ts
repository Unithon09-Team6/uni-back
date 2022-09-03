import {Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { Recipes } from './schemas/recipes.schema';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  public constructor(private readonly recipesService: RecipesService) {}

  @ApiOkResponse({
    description: '상세조회',
    type: Recipes,
  })
  @Get()
  async getRecipeById(
    @Query('id') id: string,
  ): Promise<Recipes | null> {
    const recipe = await this.recipesService.findOne(id);

    return recipe;
  }

  @Get('/category')
  async getRecipesByCategory(
    @Query('category') category: string,
    @Query('paging') paging: string,
  ): Promise<{count: number, list: Recipes[]}> {
    const [list, count] = await Promise.all([
      this.recipesService.findByCategory(
        Number(category),
        Number(paging),
      ),
      this.recipesService.getCategoryPagingCount(
        Number(category),
      ),
    ])
    return {
      count: count,
      list: list,
    };
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
