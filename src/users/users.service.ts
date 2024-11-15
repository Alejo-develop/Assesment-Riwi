import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/common/enum/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async finOneByEmail(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async create(registerDto: RegisterDto) {
    return await this.userRepository.save(registerDto)
  }

  async findUserByEmailWithPassword(email: string){
    return await this.userRepository.findOne({
      where: {email: email},
      select: [
        'email',
        'password'
      ]
    })
  }

  async findAllUsers(){
    return await this.userRepository.find()
  }

  async findAllTrainers(){
    return await this.userRepository.find({where: {role: Role.TRAINER}})
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({where: {id}});
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto){
    const userFound = await this.findById(id)
    return await this.userRepository.save({...userFound, ...updateUserDto})
  }

  async removeUser(id: string){
    await this.findById(id)
    return await this.userRepository.softDelete(id)
  }
}
