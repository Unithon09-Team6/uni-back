import { Module } from '@nestjs/common';
import { ImageUploadService } from './imageupload.service';
import { ImageUploadController } from './imageupload.controller';

@Module({
  controllers: [ImageUploadController],
  providers: [ImageUploadService],

})
export class ImageUploadModule {}
