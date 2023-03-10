import { Request } from "express";
import { User } from "./users.interface";

export interface Post {
    _id: string;
    userId: string;
    title: string;
    content: string;
    status: boolean;
    views: number;
    votes: number;
    createdAt: string;
    updateAt: string;
    user: User
}

export interface RequestWithPost extends Request {
    post: Post
}
