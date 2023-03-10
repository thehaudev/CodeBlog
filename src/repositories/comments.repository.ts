import { Comment } from "../interfaces/comment.interface";
import { CommentModel } from "../models/comments.model";
import BaseRepository from "./base.repository";

export default class CommentRepository extends BaseRepository<Comment>{
    constructor() {
        super(CommentModel);
    }
    async findCommentOfPost(filter = {}, take: number, skip: number): Promise<Comment[]> {
        return this.model
            .find(filter)
            .skip(skip)
            .limit(take)
            .populate({ path: 'user', select: ['display_name', 'email', 'avatar'] })
            .exec();
    }
    async total(filter = {}): Promise<Number> {
        return this.model.find(filter).count().exec();
    }
}