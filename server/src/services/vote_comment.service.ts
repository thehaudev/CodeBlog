import { VoteCommentDto } from "../dtos/vote.dto";
import { HttpException } from "../exceptions/HttpException";
import { Comment } from "../interfaces/comment.interface";
import { Vote_comment } from "../interfaces/vote_comment.interface";
import { CommentModel } from "../models/comments.model";
import Vote_CommentRepository from "../repositories/vote_comment.repository";
import { isEmpty } from "../utils/validator.util";


export default class Vote_CommentService {
    private readonly comments = CommentModel
    private readonly vote_commentRepository: Vote_CommentRepository

    constructor() {
        this.vote_commentRepository = new Vote_CommentRepository()
    }
    public async createVoteComment(data: VoteCommentDto): Promise<Vote_comment> {
        if (isEmpty(data)) throw new HttpException(400, "data is empty")
        const checkCommentId: Comment = await this.comments.findById(data.commentId)
        if (!checkCommentId) throw new HttpException(409, "comment id doesn't exist")

        const checkVote: Vote_comment | null = await this.vote_commentRepository.findOne({ userId: data.userId, commentId: data.commentId })
        if (checkVote) throw new HttpException(409, "vote does exist")
        return await this.vote_commentRepository.create(data)

    }

    public async updateVoteComment(data: VoteCommentDto): Promise<Vote_comment | null> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkVote: Vote_comment | null = await this.vote_commentRepository.findOne({ userId: data.userId, commentId: data.commentId })
        if (!checkVote) throw new HttpException(409, "vote doesn't exist")

        const update = await this.vote_commentRepository.update(checkVote._id + "", { type: data.type })
        return update
    }

    public async deleteVoteComment(data: any): Promise<void> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkVote = await this.vote_commentRepository.findOne({ userId: data.userId, commentId: data.commentId })
        if (!checkVote) throw new HttpException(409, "vote doesn't exist")

        return await this.vote_commentRepository.delete(checkVote._id + "")
    }

}