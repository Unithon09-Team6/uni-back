import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipesDocument = Recipes & Document;

@Schema()
export class Recipes {
  @Prop()
  name: string;
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
