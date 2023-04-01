import { IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsString()
    public userId: string

    @IsString()
    public postId: string
}