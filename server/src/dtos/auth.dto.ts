import { IsEmail, IsString, Length, Matches, Min } from "class-validator";
import { parse } from "path/posix";

export class RegisterDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  public password: string;

  @IsString()
  @Length(2, 25)
  public display_name: string;
}

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(6, 25)
  public password: string;
}

export class ChangePasswordDto {
  @IsString()
  @Length(6, 25)
  public password: string;

  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  public newPassword: string;

  @IsString()
  @Length(6, 25)
  public confirmPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  public newPassword: string;

  @IsString()
  @Length(6, 25)
  public confirmPassword: string;
}

export class sendMailDto {
  @IsEmail()
  public email: string;
}

export class resetMailDto {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
}

export class resetPasswordDto {
  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  public newPassword: string;
  @IsString()
  @Length(6, 25)
  public confirmPassword: string;
}
