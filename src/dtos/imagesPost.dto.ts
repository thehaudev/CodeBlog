import { IsString } from "class-validator";

export class CreateImageDto {
    @IsString()
    public userId?: string
    @IsString()
    public name?: string
    @IsString()
    public basename?: string
    @IsString()
    public path?: string
}