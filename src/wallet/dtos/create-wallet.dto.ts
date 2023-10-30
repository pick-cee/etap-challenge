/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateWallet, TransferWallet } from '../interfaces';

export class CreateWalletDto extends CreateWallet {
  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  currency: string; // example: NGN, USD

  @IsNotEmpty()
  @IsNumber()
  user: number;
}

export class CreateTransferDto extends TransferWallet {
  @IsNumber()
  amount: number;

  @IsNumber()
  reciepient: number;

  @IsString()
  currency: string;
}
