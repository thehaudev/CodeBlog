import { Request } from "express";
import { Comment } from "./comment.interface";
import { User } from './users.interface'

export interface DataInTokenData {
    _id: string
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    user: User;
}
export interface RequestWithUserAndComment extends Request {
    user: User;
    comment:Comment
}

export interface changePasswordData {
    password: string,
    newPassword: string,
    confirmPassword: string
}