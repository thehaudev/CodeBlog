import { NextFunction, Request, Response } from "express";
import ViewsService from "../services/views.service";

export default class ViewsController {
  public viewsService = new ViewsService();

  public createViews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId, userId } = req.body;
      const createView = this.viewsService.createView({
        postId: postId,
        userId: userId,
      });
      res.status(201).json({ data: createView, msg: "success" });
    } catch (error) {
      next(error);
    }
  };
}
