import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SubsDocument = Subs & Document;

@Schema()
export class Subs {
  @ApiProperty({ description: 'id'})
  @Prop()
  _id: string;

  @ApiProperty({ description: '카테고리 id'})
  @Prop()
  category: number;

  @ApiProperty({ description: '서브 카테고리명' })
  subCategory: string;
}

export const SubsSchema = SchemaFactory.createForClass(Subs);
