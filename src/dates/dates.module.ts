import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Date } from './entities/date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Date])],
  controllers: [DatesController],
  providers: [DatesService],
})
export class DatesModule {}
