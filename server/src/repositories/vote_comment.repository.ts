import { Vote_comment } from "../interfaces/vote_comment.interface";
import { VoteCommentModel } from "../models/vote_comment.model";
import BaseRepository from "./base.repository";
export default class Vote_CommentRepository extends BaseRepository<Vote_comment>{
    constructor() {
        super(VoteCommentModel)
    }
}