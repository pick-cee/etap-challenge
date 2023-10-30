/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly userSvc: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userSvc.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Body() loginUserDto: LoginDto) {
    return this.userSvc.loginUser(loginUserDto);
  }

  @Get()
  getUser() {
    return;
  }
}
