/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2'
import { CreateUser, LoginUser } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private config: ConfigService,
        private jwt: JwtService
    ) { }

    async createUser(createUser: CreateUser) {
        const hash = await argon.hash(createUser.password)
        const newUser = this.userRepo.create({ ...createUser, password: hash })
        return this.userRepo.save(newUser)
    }

    async loginUser(loginUser: LoginUser) {
        const user = await this.userRepo.findOne({ where: { phoneNumber: loginUser.phoneNumber } })
        if (!user) {
            throw new ForbiddenException("Incorrect credentials")
        }
        const pwMatches = await argon.verify(user.password, loginUser.password)
        if (!pwMatches) {
            throw new ForbiddenException("Incorrect credentials")
        }
        delete user.password
        return this.signToken(user.id, user.phoneNumber)
    }


    async signToken(userId: number, phoneNumber: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            phoneNumber,
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret });
        return {
            access_token: token,
        };
    }
}
