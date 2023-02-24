import CreatePost_TagData from "../dtos/post_tag.dto";
import { HttpException } from "../exceptions/HttpException";
import Post_tag from "../interfaces/post_tag.interface";
import { PostModel } from "../models/posts.model";
import Post_tagRepository from "../repositories/post_tag.repository";
import { isEmpty } from "../utils/validator.util";


export default class Post_tagService {
    private readonly post_tag = PostModel
    private readonly post_tagRepository: Post_tagRepository

    constructor() {
        this.post_tagRepository = new Post_tagRepository
    }

    public async createPostTag(postTagData: CreatePost_TagData): Promise<Post_tag> {
        if (isEmpty(postTagData)) throw new HttpException(409, "post tag data does't exist")
        const createPostTag: Post_tag = await this.post_tagRepository.create(postTagData)

        return createPostTag
    }
}