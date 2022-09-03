import { Test, TestingModule } from '@nestjs/testing';
import { ImageuploadController } from './imageupload.controller';
import { ImageuploadService } from './imageupload.service';

describe('ImageuploadController', () => {
  let controller: ImageuploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageuploadController],
      providers: [ImageuploadService],
    }).compile();

    controller = module.get<ImageuploadController>(ImageuploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
