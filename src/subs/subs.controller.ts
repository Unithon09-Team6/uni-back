import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubsService } from './subs.service';
import { Subs } from './schemas/subs.schema';

@ApiTags('subs')
@Controller('subs')
export class SubsController {
  public constructor(private readonly subsService: SubsService) {}

  @ApiOperation({ summary: '서브 카테고리 목록 조회' })
  @ApiOkResponse({
    description: '서브 카테고리 목록 조회',
    type: [Subs],
  })
  @Get()
  async getSubCategorys(@Query('category') category: string): Promise<Subs[]> {
    const subCategory = await this.subsService.findByCategory(Number(category));

    return subCategory;
  }

  @ApiOperation({ summary: '서브 카테고리 조회' })
  @ApiOkResponse({
    description: '서브 카테고리 조회',
    type: Subs,
  })
  @Get('/id')
  async getSubCategory(@Query('id') id: string): Promise<Subs | null> {
    console.log({ id });
    const subCategory = await this.subsService.findById(id);

    return subCategory;
  }
}
