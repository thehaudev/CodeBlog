import { IsEmpty, IsString, Length } from "class-validator";
import { ObjectId } from 'mongodb'
export class CreateNotificationDto {
    @IsEmpty()
    sender: ObjectId
    @IsString()
    link: string
    @IsEmpty()
    recipient: ObjectId
    @IsString()
    @Length(10)
    content: string
}