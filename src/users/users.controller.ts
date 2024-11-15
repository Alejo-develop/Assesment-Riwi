import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/common/enum/roles.enum';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  @AuthDecorator(Role.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAllUsers();
  }

  @AuthDecorator(Role.USER)
  @Get('trainers')
  async findAllTrainers() {
    return this.usersService.findAllTrainers();
  }

  @AuthDecorator(Role.USER)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @AuthDecorator(Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.removeUser(id);
  }
}
