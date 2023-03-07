import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import Vote_PostService from "../services/vote_post.service";

export default class Vote_PostController {

    public vote_postService = new Vote_PostService

    public createVotePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data = { ...req.body, userId: user._id }
            const createVotePost = await this.vote_postService.createVotePost(data)
            res.status(201).json({ data: createVotePost, message: "vote post successfully" })
        } catch (error) {
            next(error)
        }
    }
    public updateVotePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data = { ...req.body, userId: user._id }
            const updateVotePost = await this.vote_postService.updateVotePost(data)
            res.status(201).json({ data: updateVotePost, message: " updated successfully" })
        } catch (error) {
            next(error)
        }
    }

    public deleteVotePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data = { ...req.body, userId: user._id }
            const deleteVotePost = await this.vote_postService.deleteVotePost(data)
            res.status(201).json({ data: deleteVotePost, message: "deleted successfully" })
        } catch (error) {
            next(error)
        }
    }
}