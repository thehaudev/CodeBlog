import { IsString } from "class-validator";


export class CreatePost_TagDto {
    @IsString()
    public postId?: string;
    @IsString()
    public tagId?: string;
}