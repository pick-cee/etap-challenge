/* eslint-disable prettier/prettier */
export interface User {
    id: number
    password: string
    phoneNumber: string
}

export class CreateUser {
    password: string
    phoneNumber: string
    role?: string
}

export class LoginUser extends CreateUser { }

export type UpdateUser = Partial<CreateUser>