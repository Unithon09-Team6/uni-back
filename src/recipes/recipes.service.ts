import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipes, RecipesDocument } from './schemas/recipes.schema';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>) {}

  async findAll(): Promise<Recipes[]> {
    return this.recipesModel.find().exec();
  }

  async searchRecipes(searchingString: string) {
    return this.recipesModel.find({name : {$regex: searchingString}}).exec();
  }
  async uploadRecipe(searchingString: string) {
    return this.recipesModel.find({name : {$regex: searchingString}}).exec();
  }
}
