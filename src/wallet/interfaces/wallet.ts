/* eslint-disable prettier/prettier */
export interface Wallet {
    id: number
    balance?: number
    currency: string
    user: number
}

export class CreateWallet {
    balance?: number
    currency: string
    user: number
}

export class TransferWallet {
    amount: number
    reciepient: number
    currency: string
}

export type UpdateWallet = Partial<CreateWallet>