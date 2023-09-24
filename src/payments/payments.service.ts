import { Injectable, Request } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll(userId: number) {
    const data = await this.paymentRepository.find({
      where: {
        user: Like('%' + userId + '%'),
      },
      relations: ['booking'],
    });
    return {
      data: data,
    };
  }

  async findOne(id: number): Promise<Payment> {
    return await this.paymentRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
