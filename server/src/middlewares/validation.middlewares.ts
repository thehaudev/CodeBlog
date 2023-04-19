import { plainToClass, plainToClassFromExist } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { ObjectId } from "mongodb";
import { CreatePost_TagDto } from "../dtos/post_tag.dto";
export const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            if (error.constraints) return Object.values(error.constraints);
          })
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export const validationObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const objId = req.params.id;
    new ObjectId(objId + "").toString();
    next();
  } catch (error) {
    next(new HttpException(400, "Id doesn't object Id"));
  }
};

export const validationObjectIdOfPost_tag = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const array: CreatePost_TagDto[] = req.body;
    if (array.length > 5)
      throw new HttpException(400, "Tags should not exceed 5");
    else if (array.length == 0)
      throw new HttpException(400, "Tags must be at least 1");
    array.map((e: CreatePost_TagDto) => {
      Object.entries(e).forEach(([key, value]) => {
        const str = "" + value;
        new ObjectId(str).toString();
      });
    });
    next();
  } catch (error) {
    next(new HttpException(400, "Id doesn't object Id"));
  }
};
