import { Request } from "express";
import { Tag } from "./tag.interface";
import { User } from "./users.interface";

export interface Post {
    _id: string;
    userId: string;
    title: string;
    content: string;
    status: boolean;
    views: number;
    votes: number;
    bookmarks: number
    comments: number
    user: User;
    tags: Tag[];
    createdAt: string;
    updateAt: string;
}

export interface RequestWithPost extends Request {
    post: Post
}
