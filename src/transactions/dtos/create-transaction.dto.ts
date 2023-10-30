/* eslint-disable prettier/prettier */
import { CreateTransaction, MonthlyTx } from '../interfaces';

export class CreateTransactionDto extends CreateTransaction {
  user: number;

  wallet: number;

  txAmount: number;

  txDate: Date;

  reference: string;

  currency: string;

  status?: boolean;
}

export class CreateMonthlyTxDto extends MonthlyTx {
  month: number;
  year: number;
}
