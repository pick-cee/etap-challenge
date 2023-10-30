/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateMonthlyTxDto, CreateTransactionDto } from './dtos/create-transaction.dto';
import { JwtGuard } from 'src/guard';
import { CreateTransferDto } from 'src/wallet/dtos';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly txSvc: TransactionsService) { }

    @Post()
    @UsePipes(ValidationPipe)
    creditWallet(@GetUser('id') userId: number, @Body() txDto: CreateTransactionDto) {
        return this.txSvc.creditWallet(userId, txDto)
    }

    @Get(':id')
    verifyWallet(@Param('id') txId: number) {
        return this.txSvc.verifyTransaction(txId)
    }

    @Get('monthly/tx')
    getMonthlyTx(@GetUser('id') userId: number, @Body() monthTx: CreateMonthlyTxDto) {
        return this.txSvc.getMonthlyTx(userId, monthTx)
    }

    @Post('transfer')
    transfer(@GetUser('id') userId: number, @Body() transferDto: CreateTransferDto) {
        return this.txSvc.transfer(userId, transferDto)
    }

    @Get('transfer-approve/:id')
    approveTransfer(@GetUser('id') userId: number, @Param('id') txId: number) {
        return this.txSvc.approveTransfer(txId, userId)
    }
}
