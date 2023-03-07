import { HttpException } from "../exceptions/HttpException";
import { Vote_post } from "../interfaces/vote_post.interface";
import { PostModel } from "../models/posts.model";
import Vote_postRepository from "../repositories/vote_post.repository";
import { isEmpty } from "../utils/validator.util";


export default class Vote_PostService {
    private readonly posts = PostModel
    private readonly vote_postRepository: Vote_postRepository

    constructor() {
        this.vote_postRepository = new Vote_postRepository()
    }
    public async createVotePost(data: any): Promise<Vote_post> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkPostId = await this.posts.findById(data.postId)
        if (!checkPostId) throw new HttpException(409, "post id doesn't exist")

        const checkVote = await this.vote_postRepository.findOne({ userId: data.userId, postId: data.postId })
        if (checkVote) throw new HttpException(409, "vote does exist")
        return await this.vote_postRepository.create(data)

    }

    public async updateVotePost(data: any): Promise<Vote_post | null> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkVote = await this.vote_postRepository.findOne({ userId: data.userId, postId: data.postId })
        if (!checkVote) throw new HttpException(409, "vote doesn't exist")

        return await this.vote_postRepository.update(checkVote._id + "", { type: data.type })
    }

    public async deleteVotePost(data: any): Promise<void> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkVote = await this.vote_postRepository.findOne({ userId: data.userId, postId: data.postId })
        if (!checkVote) throw new HttpException(409, "vote doesn't exist")

        return await this.vote_postRepository.delete(checkVote._id + "")
    }

}