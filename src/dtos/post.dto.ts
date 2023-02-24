import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString, length, Length, Min } from "class-validator";

export class CreatePostDto {
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

    @IsEmpty()
    public status?: boolean;
    public views?: number;
    public votes?: number;
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