import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import Follow_TagService from "../services/follow_tag.service";


export default class Follow_TagController {
    public follow_tagService = new Follow_TagService

    public createFollowTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data = { ...req.body, follower: user._id }

            const createFollowTag = await this.follow_tagService.createFollowTag(data)

            res.status(201).json({ data: createFollowTag, message: "follow" })
        } catch (error) {
            next(error)
        }
    }

    public deleteFollowTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data = { ...req.body, follower: user._id }

            const deleteFollow = await this.follow_tagService.deleteFollowTag(data)

            res.status(201).json({ data: deleteFollow, message: "success" })
        } catch (error) {
            next(error)
        }
    }
}
