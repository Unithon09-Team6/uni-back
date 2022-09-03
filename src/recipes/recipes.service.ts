import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipes, RecipesDocument } from './schemas/recipes.schema';
import { CreateRecipeDto } from './dto/create-recipe';
import * as AWS from 'aws-sdk';


const AWS_S3_BUCKET_NAME = "uni-back-bucket";
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const MAX_POST = 10;
@Injectable()
export class RecipesService {
  s3 = new AWS.S3()
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

  async findBySearch(phrase: string, paging: number): Promise<Recipes[]> {
    return this.recipesModel.find({
      title : {$regex: phrase},
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

  async getSearchPagingCount (
      phrase: string,
  ): Promise<number> {
    const ret = await this.recipesModel.countDocuments({title : {$regex: phrase}});
    return Math.ceil(ret / MAX_POST) || 0;
  };

  async create(recipe: CreateRecipeDto): Promise<void> {
    await this.recipesModel.create(recipe);
  }

  async uploadImage(file: Express.Multer.File) {
    const AWS_S3_BUCKET = 'uni-back-bucket';
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: String(file.originalname),
      Body: file.buffer,
    };
    try {
      const response = await this.s3.upload(params).promise();
      return response;
    } catch (e) {
      throw new Error("Failed to upload file");
    }

  }
}
