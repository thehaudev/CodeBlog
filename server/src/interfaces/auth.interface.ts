import { Request, response, Response } from "express";
import { Server, Socket } from "socket.io";
import { Comment } from "./comment.interface";
import { Post } from "./posts.interface";
import { User } from "./users.interface";
import { Vote_post } from "./vote_post.interface";

export interface DataInTokenData {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
export interface SocketWithAccessToken extends Socket {
  accessToken: string;
  userId: string;
}
export interface RequestWithUserAndComment extends Request {
  user: User;
  comment: Comment;
}

export interface ResponseWithSocket extends Response {
  io: Server;
}

export interface RequestWithUserAndPost extends Request {
  user: User;
  post: Post;
  vote_post: Vote_post;
}

export interface changePasswordData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
