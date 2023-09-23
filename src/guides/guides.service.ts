import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide) private guideRepository: Repository<Guide>,
  ) {}

  async findAll(): Promise<any> {
    const [res, total] = await this.guideRepository.findAndCount({});
    return {
      data: res,
      total,
    };
  }

  create(createGuideDto: CreateGuideDto) {
    return 'This action adds a new guide';
  }

  async findOne(id: number): Promise<Guide> {
    return await this.guideRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
