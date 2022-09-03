import { Recipes } from '../schemas/recipes.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSearch {
  @ApiProperty({ description: '전체 페이지 수'})
  count: number;

  @ApiProperty({ type: [Recipes], description: '레시피 list' })
  list: Recipes[];
}