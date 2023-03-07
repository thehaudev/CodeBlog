import { IsBoolean, IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsEmpty()
    public userId?: string
    @IsEmpty()

    public postId?: string

    @IsString()
    public content?: string
}