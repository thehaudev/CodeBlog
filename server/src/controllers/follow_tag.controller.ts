import { NextFunction, Response } from "express";
import { FollowTagDto } from "../dtos/follow.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { Follow_Tag } from "../interfaces/follow_tag.interface";
import Follow_TagService from "../services/follow_tag.service";


export default class Follow_TagController {
    public follow_tagService = new Follow_TagService

    public findFollowTagOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data = { follower: user._id }

            const tagsFollowing: Follow_Tag[]|null = await this.follow_tagService.findFollowTagOfUser(data)
            res.status(201).json({ data: tagsFollowing, message: "tags follow by user" })
        } catch (error) {
            next(error)
        }
    }

    public findFollowTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const tagId:string = req.query.tagId +""
            const data: FollowTagDto = { tagId:tagId, follower: user._id }

            const followTag: Follow_Tag|null = await this.follow_tagService.findFollowTag(data)

            res.status(201).json({ data: followTag, message: "find follow tag" })
        } catch (error) {
            next(error)
        }
    }

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

            res.status(201).json({ message: "delete success" })
        } catch (error) {
            next(error)
        }
    }
}
