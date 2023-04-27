import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  public password: string;

  @IsString()
  @Length(2, 25)
  public display_name: string;

  @IsOptional()
  @IsString()
  public bio: string;

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsString()
  public about: string;

  @IsOptional()
  @IsEmpty()
  public avatar: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(6, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  public password: string;

  @IsOptional()
  @IsString()
  @Length(2, 25)
  public display_name: string;

  @IsOptional()
  @IsString()
  public bio: string;

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsString()
  public about: string;

  @IsOptional()
  @IsEmpty()
  public avatar: string;

  @IsOptional()
  @IsString()
  public oldAvatar?: string;

  @IsOptional()
  public role: number;
}
export class changeProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 25)
  public display_name: string;

  @IsOptional()
  @IsString()
  public bio: string;

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsString()
  public about: string;

  @IsOptional()
  @IsEmpty()
  public avatar: string;

  @IsOptional()
  @IsString()
  public oldAvatar?: string;
}
