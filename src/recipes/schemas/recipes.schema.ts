import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RecipesDocument = Recipes & Document;

class timerList {
  @ApiProperty({ description: '타이머 제목' })
  @Prop()
  text: string;

  @ApiProperty({ description: '시간(초)' })
  @Prop()
  sec: number;
}
@Schema()
export class Recipes {
  @ApiProperty({ description: 'id'})
  @Prop()
  _id: string;

  @ApiProperty({ description: '제목' })
  @Prop()
  title: string;

  @ApiProperty({ description: '카테고리 (0 ~ 3)' })
  @Prop()
  category: number;

  @ApiProperty({ description: '사진 URL' })
  @Prop()
  picUrl: string;

  @ApiProperty({ description: '상세 설명' })
  @Prop()
  detail: string;
  
  @ApiProperty({ type: [timerList], description: '타이머 list' })
  @Prop()
  timer: timerList[];
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
