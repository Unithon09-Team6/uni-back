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

  @ApiProperty({ description: '상품명 '})
  @Prop()
  productName: string;

  @ApiProperty({ description: '간단 설명' })
  @Prop()
  title: string;

  @ApiProperty({ description: '카테고리 (0 ~ 3)' })
  @Prop()
  category: number;

  @ApiProperty({ description: '서브 카테고리 id'})
  @Prop()
  subCategory: string;

  @ApiProperty({ description: '사진 URL' })
  @Prop()
  picUrl: string;

  @ApiProperty({ description: '상세 설명(재료)' })
  @Prop()
  detail: string;

  @ApiProperty({ description: '전체 조리 시간' })
  @Prop()
  totalCount: number;
  
  @ApiProperty({ type: [timerList], description: '타이머 list' })
  @Prop()
  timer: timerList[];
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
