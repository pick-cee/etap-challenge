/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { WalletEntity } from 'src/wallet/wallet.entity';
import { UserEntity } from 'src/users/user.entity';
import { PaystackModule } from 'nestjs-paystack';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, WalletEntity, UserEntity]),
    PaystackModule.forRoot({
      apiKey: 'sk_test_6d2bc87ea9130d786e7b9adb2da7514a7100fd61',
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
