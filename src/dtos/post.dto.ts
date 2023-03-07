import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString, length, Length, Min } from "class-validator";

export class CreatePostDto {
    @IsString()
    @Length(15)
    public title?: string;
    @IsString()
    @Length(15)
    public content?: string;
}

export class UpdatePostDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    public userId?: string;

    @IsNotEmpty()
    @IsString()
    @Length(15)
    public title?: string;

    @IsNotEmpty()
    @IsString()
    @Length(15)
    public content?: string;

    @IsBoolean()
    public status?: boolean;
    @IsNumber()
    public views?: number;
    public votes?: number;
}