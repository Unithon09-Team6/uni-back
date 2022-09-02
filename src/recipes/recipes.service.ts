import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipes, RecipesDocument } from './schemas/recipes.schema';
import { CreateRecipeDto } from './dto/create-recipe';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>) {}

  async findAll(): Promise<Recipes[]> {
    return this.recipesModel.find().exec();
  }

  async findByCategory(category: number): Promise<Recipes[]> {
    return this.recipesModel.find({
      category: category,
    }).exec();
  }

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
