import { Training } from 'src/common/enum/training.enum';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Date {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' , referencedColumnName: 'id'})
  user: User

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'trainerId' , referencedColumnName: 'id'})
  trainer: User

  @Column()
  trainerId: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId' , referencedColumnName: 'id'})
  room: Room

  @Column()
  roomId: string;

  @Column({ type: 'enum', enum: Training})
  type: Training

  @Column({ type: 'timestamp' })  
  date: Date;

  @Column({nullable: true, default: null})
  notes?: string

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deleteAt: Date;
}