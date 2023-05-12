import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import CommentService from "../services/comment.service";

export default class CommentsController {
  public commentService = new CommentService();

  public deleteComment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await this.commentService.deleteComment(id);
      res.status(200).json({ msg: "delete comment success" });
    } catch (error) {
      next(error);
    }
  };
}
