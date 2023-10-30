/* eslint-disable prettier/prettier */
export interface Transaction {
  id: number;
  wallet: number;
  user: number;
  txAmount: number;
  txdate: Date;
  reference: string;
  currency: string;
  status: boolean;
}

export class CreateTransaction {
  wallet: number;
  user: number;
  txAmount: number;
  txDate: Date;
  reference: string;
  currency: string;
  status?: boolean;
}

export class MonthlyTx {
  month: number;
  year: number;
}
