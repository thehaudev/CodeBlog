import { CreateCommentDto } from "../dtos/comment.dto";
import { HttpException } from "../exceptions/HttpException";
import { Comment } from "../interfaces/comment.interface";
import { PostModel } from "../models/posts.model";
import { UserModel } from "../models/users.model";
import CommentRepository from "../repositories/comments.repository";

export default class CommentService {
    private readonly users = UserModel
    private readonly posts = PostModel
    private readonly commentRepository: CommentRepository

    constructor() {
        this.commentRepository = new CommentRepository()
    }

    public async comment(commentData: CreateCommentDto): Promise<Comment> {
        const checkIdUser = await this.users.findById(commentData.userId)
        if (!checkIdUser) throw new HttpException(409, "User doesn't exist")

        const checkIdPost = await this.posts.findById(commentData.postId)
        if (!checkIdPost) throw new HttpException(409, "Post doesn't exist")

        const comment = await this.commentRepository.create(commentData)
        return comment;
    }
}