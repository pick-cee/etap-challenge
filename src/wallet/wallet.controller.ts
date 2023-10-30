/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateWalletDto } from './dtos';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletSvc: WalletService) {}

  @Post()
  createWallet(
    @GetUser('id') userId: number,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.walletSvc.createWallet(createWalletDto, userId);
  }
}
