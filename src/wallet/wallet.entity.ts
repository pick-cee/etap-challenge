/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./interfaces";
import { UserEntity } from "src/users/user.entity";


@Entity()
export class WalletEntity implements Wallet {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'walletId',
    })
    id: number;

    @Column({
        default: 0
    })
    balance?: number;

    @Column({
        nullable: false,
        length: 3
    })
    currency: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: number;

}