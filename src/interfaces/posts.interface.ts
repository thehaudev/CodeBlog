import { Request } from "express";

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
}

export interface RequestWithPost extends Request {
    post: Post
}
