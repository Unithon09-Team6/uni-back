import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { ConfigModule } from '@nestjs/config';
import { SubsModule } from './subs/subs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
    process.env.MONGODB_URL
  ), RecipesModule, SubsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
