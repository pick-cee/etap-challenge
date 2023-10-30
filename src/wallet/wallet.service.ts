/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from './wallet.entity';
import { Repository } from 'typeorm';
import { CreateWallet } from './interfaces';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createWallet(wallet: CreateWallet, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new ForbiddenException('Pleae log in or create an account');
    }
    const newWallet = this.walletRepo.create({ ...wallet, user: user.id });
    await this.walletRepo.save(newWallet);
    return newWallet;
  }
}
