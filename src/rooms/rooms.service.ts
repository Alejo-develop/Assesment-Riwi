import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.roomRepository.save(createRoomDto)
  }

  async findAllRooms(){
    return await this.roomRepository.find()
  }

  async findById(id: string): Promise<Room> {
    return await this.roomRepository.findOne({where: {id}});
  }

  async removeRoom(id: string){
    await this.findById(id)
    return await this.roomRepository.softDelete(id)
  }
}
