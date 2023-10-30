/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common"
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService, @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET")
        })
    }
    async validate(payload: { sub: number, phoneNumber: string }) {
        const user = this.userRepo.findOne({
            where: {
                id: payload.sub
            }
        })
        delete (await user).password
        return payload
    }
}