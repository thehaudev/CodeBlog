import { IsEmpty, IsOptional, IsString, Length } from "class-validator";
import { ObjectId } from 'mongodb'
export class CreateNotificationDto {
    @IsEmpty()
    sender: string
    @IsString()
    link: string
    @IsEmpty()
    recipient: string
    @IsString()
    @Length(10)
    @IsOptional()
    content: string
}