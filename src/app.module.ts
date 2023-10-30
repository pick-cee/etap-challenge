/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { WalletEntity } from './wallet/wallet.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionEntity } from './transactions/transaction.entity';
import { PaystackModule } from 'paystack-nestjs';

@Module({
  imports: [UsersModule, WalletModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity, WalletEntity, TransactionEntity],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
