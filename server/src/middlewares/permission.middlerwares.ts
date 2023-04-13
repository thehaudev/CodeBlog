import { NextFunction, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import {
  RequestWithUser,
  RequestWithUserAndComment,
  RequestWithUserAndPost,
} from "../interfaces/auth.interface";
import { Comment } from "../interfaces/comment.interface";
import Notification from "../interfaces/notifications.interface";
import { Post } from "../interfaces/posts.interface";
import { User } from "../interfaces/users.interface";
import { Vote_post } from "../interfaces/vote_post.interface";
import CommentRepository from "../repositories/comments.repository";
import NotificationRepository from "../repositories/notification.repository";
import PostRepository from "../repositories/posts.repository";
import Vote_postRepository from "../repositories/vote_post.repository";

const vote_postRepository = new Vote_postRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();
const notificationRepository = new NotificationRepository();

export const adminRole = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role != 1) res.status(403).json({ msg: "not allowed" });
  next();
};

///permission posts

export const permissionComment = async (
  req: RequestWithUserAndComment,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment: Comment | null = await commentRepository.findById(
      req.params.id + ""
    );
    if (!comment) throw new HttpException(400, "comment don't exist");
    if (!canCRUDComment(req.user, comment))
      throw new HttpException(403, "not allowed");
    req.comment = comment;
    next();
  } catch (error) {
    next(error);
  }
};

const canCRUDComment = (user: User, comment: Comment | null) => {
  return user.role == 1 || user._id + "" === comment?.userId + "";
};
///permission vote_post

export const permissionVotePost = async (
  req: RequestWithUserAndPost,
  res: Response,
  next: NextFunction
) => {
  try {
    const vote_post: Vote_post | null = await vote_postRepository.findById(
      req.params.id
    );
    if (!vote_post) throw new HttpException(400, "vote don't exist");

    if (!canCRUDVotePost(req.user, vote_post))
      throw new HttpException(403, "not allowed");

    const post: Post | null = await postRepository.findById(
      vote_post.postId + ""
    );
    if (!post) throw new HttpException(400, "post don't exist");
    req.post = post;
    req.vote_post = vote_post;
    next();
  } catch (error) {
    next(error);
  }
};

const canCRUDVotePost = (user: User, vote_post: Vote_post | null) => {
  return user.role == 1 || user._id + "" === vote_post?.userId + "";
};
///permission posts

export const permissionPost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: Post | null = await postRepository.findById(req.params.id);
    if (!post) throw new HttpException(400, "post don't exist");
    if (!canCRUDPost(req.user, post))
      throw new HttpException(403, "not allowed");
    next();
  } catch (error) {
    next(error);
  }
};

const canCRUDPost = (user: User, post: Post | null) => {
  return user.role == 1 || user._id + "" === post?.userId + "";
};

//permission users

export const permissionUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!canCRUDUser(req.user, req.params.id))
      throw new HttpException(403, "not allowed");
    next();
  } catch (error) {
    next(error);
  }
};

export const permissionRecipient = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const notification: Notification | null =
      await notificationRepository.findById(req.params.id);
    if (!notification) throw new HttpException(400, "notification don't exist");
    if (!canCRUDUser(req.user, notification.recipient.toString()))
      throw new HttpException(403, "not allowed");
    next();
  } catch (error) {
    next(error);
  }
};

const canCRUDUser = (user: User, id: string) => {
  return user.role == 1 || user._id + "" == id;
};
