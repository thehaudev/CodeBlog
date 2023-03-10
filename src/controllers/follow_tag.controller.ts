import { NextFunction, Response } from "express";
import { FollowTagDto } from "../dtos/follow.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { Follow_Tag } from "../interfaces/follow_tag.interface";
import Follow_TagService from "../services/follow_tag.service";


export default class Follow_TagController {
    public follow_tagService = new Follow_TagService

    public createFollowTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data: FollowTagDto = { ...req.body, follower: user._id }

            const createFollowTag: Follow_Tag = await this.follow_tagService.createFollowTag(data)

            res.status(201).json({ data: createFollowTag, message: "follow" })
        } catch (error) {
            next(error)
        }
    }

    public deleteFollowTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data: FollowTagDto = { ...req.body, follower: user._id }

            await this.follow_tagService.deleteFollowTag(data)

            res.status(201).json({ message: "success" })
        } catch (error) {
            next(error)
        }
    }
}
