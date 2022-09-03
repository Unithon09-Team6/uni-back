import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { ConfigModule } from '@nestjs/config';
import {ImageUploadModule} from "./imageupload/imageupload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
    process.env.MONGODB_URL
  ), RecipesModule, ImageUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
