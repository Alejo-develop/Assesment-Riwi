import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Date } from './entities/date.entity';
import { Repository } from 'typeorm';
import { Training } from 'src/common/enum/training.enum';
import { format } from '@formkit/tempo';

@Injectable()
export class DatesService {
  constructor(
    @InjectRepository(Date) private readonly dateRepository: Repository<Date>,
  ) {}

  async create(createDateDto: CreateDateDto) {
    const formattedDate = format(createDateDto.date);
    console.log(formattedDate);
     

    const entity = this.dateRepository.create({
      ...createDateDto,
      date: formattedDate, 
    });

    // Guardar la entidad en la base de datos
    return createDateDto
  }

  async isTrainerAviable(date: Date, trainerId: string) {
    const trainer = await this.dateRepository.findOne({
      where: { trainerId: trainerId, date: date },
    });

    if (trainer) {
      return {
        message: 'This trainer is not available at this time',
      };
    }
  }

  async isRoomAviable(date: Date, roomId: string) {
    roomId;
    const room = await this.dateRepository.findOne({
      where: { trainerId: roomId, date: date },
    });

    if (room) {
      return {
        message: 'This room is not available at this time',
      };
    }
  }

  async historyUser(userId: string) {
    return await this.dateRepository.find({ where: { userId: userId } });
  }

  async findAllWithDate(date: Date) {
    return await this.dateRepository.find({ where: { date: date } });
  }

  async findAllWithTypeTraining(type: Training) {
    return await this.dateRepository.find({ where: { type: type } });
  }

  async findById(id: string) {
    const date = await this.dateRepository.findOne({ where: { id } });

    if (!date) throw new NotFoundException('Date Not found');
  }

  async remove(id: string) {
    await this.findById(id);

    return await this.dateRepository.softDelete(id);
  }
}
