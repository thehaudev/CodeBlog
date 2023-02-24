import { DataInTokenData, RequestWithUser } from "../interfaces/auth.interface";
import { Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { UserModel } from "../models/users.model";
import { User } from "../interfaces/users.interface";
import { HttpException } from "../exceptions/HttpException";
require('dotenv').config()

export const verify = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies['Authorization'];

    if (!token) return res.status(401).json('Authentication token missing');
    const secretKey: string = process.env.SECRET_KEY || ""

    try {
        const verified = await jwt.verify(token, secretKey) as DataInTokenData;
        const userId = verified._id
        await UserModel.findById(userId)
            .then((data: User) => {
                if (!data) {
                    next(new HttpException(401, 'Wrong authentication token'));
                }
                req.user = data;
                next();
            })
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};