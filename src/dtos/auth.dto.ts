import { IsEmail, IsString, Length, Matches, Min } from "class-validator"

export class RegisterDto {
    @IsEmail()
    public email: string

    @IsString()
    @Length(6, 25)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    public password: string

    @IsString()
    @Length(2, 25)
    public display_name: string
}

export class LoginDto {
    @IsEmail()
    public email: string

    @IsString()
    @Length(6, 25)
    public password: string
}

export class ChangePasswordDto {
    @IsString()
    @Length(6, 25)
    public password: string

    @IsString()
    @Length(6, 25)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    public newPassword: string

    @IsString()
    @Length(6, 25)
    public confirmPassword: string
}

