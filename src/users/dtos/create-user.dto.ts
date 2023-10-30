/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUser, LoginUser } from "../interfaces";


export class CreateUserDto extends CreateUser {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsString()
    @IsOptional()
    role?: string
}

export class LoginDto extends LoginUser { }