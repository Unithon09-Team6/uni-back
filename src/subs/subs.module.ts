import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubsController } from './subs.controller';
import { SubsService } from './subs.service';
import { Subs, SubsSchema } from './schemas/subs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subs.name, schema: SubsSchema }])],
  controllers: [SubsController],
  providers: [SubsService]
})
export class SubsModule {}
