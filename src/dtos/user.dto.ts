
import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class IdDto {
    @IsString()
    @IsNotEmpty()
    public id?: string
}

export class CreateUserDto {
    @IsEmail()
    public email?: string

    @IsString()
    @Length(6, 25)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    public password?: string

    @IsString()
    @Length(2, 25)
    public display_name?: string
    @IsString()
    public bio?: string
    @IsString()
    public location?: string
    @IsString()
    public about?: string
    @IsEmpty()
    public avatar?: string
}

export class UpdateUserDto {
    @IsEmail()
    public email?: string

    @IsString()
    @Length(6, 25)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    public password?: string

    @IsString()
    @Length(2, 25)
    public display_name?: string
    @IsString()
    public bio?: string
    @IsString()
    public location?: string
    @IsString()
    public about?: string
    @IsEmpty()
    public avatar?: string
    @IsString()
    public oldAvatar?: string
}
export class changeProfileDto {
    @IsString()
    @Length(2, 25)
    public display_name?: string
    @IsString()
    public bio?: string
    @IsString()
    public location?: string
    @IsString()
    public about?: string
    @IsEmpty()
    public avatar?: string
    @IsString()
    public oldAvatar?: string
}