import { IsString, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    fullName: string

    @IsString()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}