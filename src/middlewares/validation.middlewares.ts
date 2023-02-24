import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '../exceptions/HttpException';

export const validationMiddleware = (
    type: any,
    value: 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {

        validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                console.log(errors)
                const message = errors.map((error: ValidationError) => { if (error.constraints) return Object.values(error.constraints) }).join(', ');
                next(new HttpException(400, message))
            } else {
                next()
            }
        });
    };
};
