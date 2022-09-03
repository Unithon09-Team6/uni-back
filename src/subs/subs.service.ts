import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subs, SubsDocument } from './schemas/subs.schema';

@Injectable()
export class SubsService {
  constructor(@InjectModel(Subs.name) private subsModel: Model<SubsDocument>) {}

  async findByCategory(category: number): Promise<Subs[]> {
    return this.subsModel.find({ category: category }).exec();
  }
}
