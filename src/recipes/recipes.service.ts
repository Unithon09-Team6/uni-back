import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipes, RecipesDocument } from './schemas/recipes.schema';
import { CreateRecipeDto } from './dto/create-recipe';

const MAX_POST = 10;
@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>) {}

  async findAll(): Promise<Recipes[]> {
    return this.recipesModel.find().exec();
  }

  async findOne(_id: string): Promise<Recipes | null> {
    return this.recipesModel.findOne({ _id: _id }).exec();
  }

  async findByCategory(category: number, paging: number): Promise<Recipes[]> {
    return this.recipesModel.find({
      category: category,
    }, null, {
      skip: (paging - 1) * MAX_POST,
      limit: MAX_POST,
      sort: { _id: -1 },
    }).exec();
  }

  async getCategoryPagingCount (
    category: number,
  ): Promise<number> {
    const ret = await this.recipesModel.countDocuments({ category: category });
  
    return Math.ceil(ret / MAX_POST) || 0;
  };

  async create(recipe: CreateRecipeDto): Promise<void> {
    await this.recipesModel.create(recipe);
  }

  async searchRecipes(searchingString: string) {
    return this.recipesModel.find({title : {$regex: searchingString}}).exec();
  }
  async uploadRecipe(searchingString: string) {
    return this.recipesModel.find({name : {$regex: searchingString}}).exec();
  }
}
