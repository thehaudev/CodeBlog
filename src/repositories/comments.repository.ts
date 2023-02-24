import { Comment } from "../interfaces/comment.interface";
import { CommentModel } from "../models/comments.model";
import BaseRepository from "./base.repository";

export default class CommentRepository extends BaseRepository<Comment>{
    constructor() {
        super(CommentModel);
    }
}