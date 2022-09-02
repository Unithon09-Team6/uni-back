import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesController } from './recipes.controller';
import { Recipes, RecipesSchema } from './schemas/recipes.schema';
import { RecipesService } from './recipes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Recipes.name, schema: RecipesSchema }])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
