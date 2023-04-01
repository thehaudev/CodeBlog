import { DataInTokenData, RequestWithUser } from "../interfaces/auth.interface";
import { Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { UserModel } from "../models/users.model";
import { User } from "../interfaces/users.interface";
import { HttpException } from "../exceptions/HttpException";
require('dotenv').config()

export const verify = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json('Authentication token missing');
    const secretKey: string = process.env.ACCESS_TOKEN_SECRET || ""

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
        return res.status(400).json({ msg: 'Invalid Token' });
    }
};

export const verifyRefreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.RefreshToken;
    if (!token) return res.status(401).json('Please login');
    const secretKey: string = process.env.REFRESH_TOKEN_SECRET||""

    try {
        const verified = await jwt.verify(token, secretKey) as DataInTokenData;
        const userId = verified._id
        await UserModel.findById(userId)
            .then((data: User) => {
                if (!data) {
                    next(new HttpException(401, 'Wrong authentication refreshToken'));
                }
                req.user = data;
                next();
            })
    } catch (err) {
        return res.status(400).json({ msg: 'Invalid refreshToken' });
    }
};