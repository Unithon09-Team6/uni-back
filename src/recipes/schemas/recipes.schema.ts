import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipesDocument = Recipes & Document;

@Schema()
export class Recipes {
  @Prop()
  title: string;

  @Prop()
  category: number;

  @Prop()
  picUrl: string;

  @Prop()
  detail: string;
  
  @Prop()
  timer: [
    {
      text: string,
      sec: number
    }
  ]
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
