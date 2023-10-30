/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './interfaces';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'userId',
  })
  id: number;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  phoneNumber: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;
}
