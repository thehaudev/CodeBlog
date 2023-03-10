import { CreateCommentDto } from "../dtos/comment.dto";
import { HttpException } from "../exceptions/HttpException";
import { Comment } from "../interfaces/comment.interface";
import { PostModel } from "../models/posts.model";
import { UserModel } from "../models/users.model";
import CommentRepository from "../repositories/comments.repository";
import { isEmpty } from "../utils/validator.util";

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

    public async findCommentsOfPost(postId: string, pagination: any): Promise<Comment[]> {
        if (isEmpty(postId)) throw new HttpException(409, "post id is empty")

        const checkIdPost = await this.posts.findById(postId)
        if (!checkIdPost) throw new HttpException(409, "Post doesn't exist")

        const comments = await this.commentRepository.findCommentOfPost({ postId: postId }, pagination.take, pagination.skip)
        return comments
    }

    public async totalCommentOfPost(postId: string): Promise<Number> {
        if (isEmpty(postId)) throw new HttpException(409, "post id is empty")

        const checkIdPost = await this.posts.findById(postId)
        if (!checkIdPost) throw new HttpException(409, "Post doesn't exist")

        const total = await this.commentRepository.total({ postId: postId })
        return total
    }


}