import {
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class ViewsPost {
  @IsString()
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
    message: "not objectId",
  })
  public postId: string;
  @IsOptional()
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
    message: "not objectId",
  })
  public userId: string;
}
