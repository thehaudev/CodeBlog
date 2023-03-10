import { NextFunction, Response } from "express"
import { VoteCommentDto } from "../dtos/vote.dto"
import { RequestWithUser } from "../interfaces/auth.interface"
import { User } from "../interfaces/users.interface"
import { Vote_comment } from "../interfaces/vote_comment.interface"
import Vote_CommentService from "../services/vote_comment.service"

export default class Vote_CommentController {

    public vote_commentService = new Vote_CommentService

    public createVoteComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data: VoteCommentDto = { ...req.body, userId: user._id }
            const createVotePost: Vote_comment = await this.vote_commentService.createVoteComment(data)
            res.status(201).json({ data: createVotePost, message: "vote comment successfully" })
        } catch (error) {
            next(error)
        }
    }
    public updateVoteComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data: VoteCommentDto = { ...req.body, userId: user._id }
            const updateVoteComment: Vote_comment | null = await this.vote_commentService.updateVoteComment(data)
            res.status(200).json({ data: updateVoteComment, message: " updated successfully" })
        } catch (error) {
            next(error)
        }
    }

    public deleteVoteComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const data = { ...req.body, userId: user._id }
            const deleteVoteComment = await this.vote_commentService.deleteVoteComment(data)
            res.status(200).json({ data: deleteVoteComment, message: "deleted successfully" })
        } catch (error) {
            next(error)
        }
    }
}