/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { WalletEntity } from 'src/wallet/wallet.entity';
import { Between, Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { CreateTransaction, MonthlyTx } from './interfaces';
import { InjectPaystack, } from 'nestjs-paystack';
import { Paystack } from 'paystack-sdk';
import { TransactionInitialized } from 'paystack-sdk/dist/transaction/interface';
import { TransferWallet } from 'src/wallet/interfaces';


@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepo: Repository<WalletEntity>,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
        @InjectPaystack() private paystackClient: Paystack
    ) { }

    async creditWallet(userId: number, createTx: CreateTransaction) {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        const wallet = await this.walletRepo.findOne({ where: { user: userId, currency: createTx.currency } })
        const totalAmount = createTx.txAmount * 100
        const tx = await this.paystackClient.transaction.initialize({
            amount: totalAmount,
            email: 'akin@gmail.com',
            reference: createTx.reference
        }) as TransactionInitialized
        const newTx = this.transactionRepo.create({ ...createTx, wallet: wallet.id, user: user.id, txdate: new Date })
        await this.transactionRepo.save(newTx)
        return { newTx, tx }
    }

    async verifyTransaction(txId: number) {
        const tx = await this.transactionRepo.findOne({ where: { id: txId } })
        const wallet = await this.walletRepo.findOne({ where: { id: tx.wallet } })
        const ref = tx.reference
        const verify = await this.paystackClient.transaction.verify(ref)
        if (verify) {
            await this.transactionRepo.update(txId, { status: true })
            await this.walletRepo.update({ id: tx.wallet }, { balance: wallet.balance + tx.txAmount })
            return verify
        }
        else {
            return 'Transaction not successful'
        }
    }

    async getMonthlyTx(userId: number, monthTx: MonthlyTx) {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        if (user.role === 'admin') {
            const startDate = new Date(monthTx.year, monthTx.month - 1, 1);
            const endDate = new Date(monthTx.year, monthTx.month, 0, 23, 59, 59, 999);
            return await this.transactionRepo.find({ where: { txdate: Between(startDate, endDate) } })
        }
        else {
            throw new ForbiddenException("You are not permitted")
        }
    }

    async transfer(userId: number, transfer: TransferWallet) {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        const userWallet = await this.walletRepo.findOne({ where: { user: userId } })
        const recipient = await this.userRepo.findOneBy({ id: transfer.reciepient })
        console.log(recipient)
        const reciepientWallet = await this.walletRepo.findOne({ where: { user: recipient.id, currency: transfer.currency } })
        console.log(reciepientWallet)

        // if (userWallet.balance > transfer.amount) {
        //     if (transfer.amount < 1000000) {
        //         await this.walletRepo.update(userWallet.id, { balance: userWallet.balance - transfer.amount })
        //         await this.walletRepo.update(reciepientWallet.id, { balance: reciepientWallet.balance + transfer.amount })
        //         const newTx = this.transactionRepo.create({
        //             currency: transfer.currency,
        //             txAmount: transfer.amount,
        //             user: recipient.id,
        //             wallet: reciepientWallet.id,
        //             txdate: new Date,
        //             status: true
        //         })
        //         return this.transactionRepo.save(newTx)
        //     }
        //     else {
        //         userWallet.balance = userWallet.balance - transfer.amount
        //         const newTx = this.transactionRepo.create({
        //             currency: transfer.currency,
        //             txAmount: transfer.amount,
        //             user: recipient.id,
        //             wallet: reciepientWallet.id,
        //             txdate: new Date,
        //             status: false
        //         })
        //         await this.transactionRepo.save(newTx)
        //         return 'Your transfer request has been sent to an admin for approval'
        //     }
        // }
    }

    async approveTransfer(txId: number, userId: number) {
        const tx = await this.transactionRepo.findOne({ where: { id: txId } })
        const user = await this.userRepo.findOne({ where: { id: userId } })
        const reciepientWallet = await this.walletRepo.findOneBy({ id: tx.wallet })
        if (user.role === 'admin') {
            await this.transactionRepo.update(tx.id, { status: true })
            await this.walletRepo.update(reciepientWallet.id, { balance: reciepientWallet.balance + tx.txAmount })
        }
        else {
            throw new ForbiddenException("You cannot perform this action")
        }
    }
}
