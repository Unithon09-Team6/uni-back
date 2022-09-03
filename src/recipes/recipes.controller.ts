import {Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { Recipes } from './schemas/recipes.schema';
import {FileInterceptor} from "@nestjs/platform-express";

import { ResponseSearch } from './types/recipes.types';


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

  @ApiOkResponse({
    description: '상품명 조회',
    type: ResponseSearch,
  })
  @Get('/search')
  async searchRecipes(
    @Query('target') phrase: string, 
    @Query('paging') paging: string
  ) {
    const [list, count] = await Promise.all([
      this.recipesService.findBySearch(
          phrase,
          Number(paging),
      ),
      this.recipesService.getSearchPagingCount(
          phrase,
      ),
    ])
    return {
      count: count,
      list: list,
    };
  }

  @ApiOkResponse({
    description: '카테고리 조회',
    type: ResponseSearch,
  })
  @Get('/search/category')
  async getRecipesByCategory(
    @Query('category') category: string,
    @Query('paging') paging: string,
  ): Promise<ResponseSearch> {
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

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.recipesService.uploadImage(file);
  }

  @Post()
  async createRecipe(@Body() body): Promise<string> {
    await this.recipesService.create(body);
    return 'true';
  }
}
