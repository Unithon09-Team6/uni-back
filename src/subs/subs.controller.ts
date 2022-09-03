import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SubsService } from './subs.service';
import { Subs } from './schemas/subs.schema';

@ApiTags('subs')
@Controller('subs')
export class SubsController {
  public constructor(private readonly subsService: SubsService) {}

  @ApiOkResponse({
    description: '서브 카테고리 조회',
    type: [Subs],
  })
  @Get()
  async getSubCategory(
    @Query('category') category: string,
  ): Promise<Subs[]> {
    const subCategory = await this.subsService.findByCategory(Number(category));

    return subCategory;
  }
}
