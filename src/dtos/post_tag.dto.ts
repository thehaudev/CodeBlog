import { IsString } from "class-validator";


export default class CreatePost_TagData {
    @IsString()
    public postId?: string;

    @IsString()
    public userId?: string;
}