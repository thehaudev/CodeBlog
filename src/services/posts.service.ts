import { PostModel } from "../models/posts.model";
import PostRepository from "../repositories/posts.repository";
import { Post } from "../interfaces/posts.interface";
import { HttpException } from "../exceptions/HttpException";
import { isEmpty } from "../utils/validator.util";
import { CreatePostDto } from "../dtos/post.dto";
import { UserModel } from "../models/users.model";
import UserRepository from "../repositories/users.repository";

export default class PostsService {
    private readonly posts = PostModel
    private readonly users = UserModel
    private readonly postRepository: PostRepository

    constructor() {
        this.postRepository = new PostRepository()
    }

    public async findAllPosts(filter?: any): Promise<Post[]> {
        return this.postRepository.findAndSort(filter.skip, filter.take, filter.sort, filter.search)
    }

    public async findPostById(id: string): Promise<Post> {
        if (isEmpty(id)) throw new HttpException(400, 'PostId is empty');

        const findPost: Post | null = await this.postRepository.findById(id)
        if (!findPost) throw new HttpException(409, "Post doesn't exist");

        return findPost
    }

    public async createPost(postData: CreatePostDto): Promise<Post> {
        if (isEmpty(postData)) throw new HttpException(400, 'PostData is empty');

        const checkIdUser = await this.users.findById(postData.userId)
        if (!checkIdUser) throw new HttpException(409, "User doesn't exist")

        const createPost: Post = await this.postRepository.create(postData)

        return createPost
    }

    public async updatePost(postData: CreatePostDto, postId: string): Promise<Post> {
        if (isEmpty(postData)) throw new HttpException(400, 'PostData is empty');

        const checkIdUser = await this.users.findById(postData.userId)
        if (!checkIdUser) throw new HttpException(409, "User doesn't exist")

        const updatePost: Post | null = await this.postRepository.update(postId, postData)
        if (!updatePost) throw new HttpException(409, "Post doesn't exist")

        return updatePost;
    }

    public async deletePost(postId: string): Promise<void> {
        await this.postRepository.delete(postId)
    }

}