import { IsString, Matches } from "class-validator";


export class CreatePost_TagDto {
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public postId: string;
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public tagId: string;
}