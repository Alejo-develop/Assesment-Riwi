import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateDateDto {
    @IsString()
    userId: string;

    @IsString()
    trainerId: string;

    @IsString()
    roomId: string;

    @IsString()
    type: string

    @IsString()
    date: string;
}
