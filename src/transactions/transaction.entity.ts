/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./interfaces";
import { UserEntity } from "src/users/user.entity";
import { WalletEntity } from "src/wallet/wallet.entity";


@Entity()
export class TransactionEntity implements Transaction {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'transactionId',
    })
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: number

    @ManyToOne(() => WalletEntity)
    @JoinColumn()
    wallet: number;

    @Column({ type: String })
    currency: string

    @Column()
    txAmount: number;

    @Column({ nullable: true })
    reference: string

    @Column({ type: Boolean, default: false })
    status: boolean

    @Column({
        type: Date
    })
    txdate: Date;
}