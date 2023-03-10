import { CreatePost_TagDto } from "../dtos/post_tag.dto";
import { HttpException } from "../exceptions/HttpException";
import { Post } from "../interfaces/posts.interface";
import Post_tag from "../interfaces/post_tag.interface";
import { Tag } from "../interfaces/tag.interface";
import { PostModel } from "../models/posts.model";
import { TagModel } from "../models/tags.model";
import Post_tagRepository from "../repositories/post_tag.repository";
import { isEmpty } from "../utils/validator.util";


export default class Post_tagService {
    private readonly posts = PostModel
    private readonly tags = TagModel
    private readonly post_tagRepository: Post_tagRepository


    constructor() {
        this.post_tagRepository = new Post_tagRepository
    }

    public async createPostTag(postTagData: CreatePost_TagDto[]): Promise<Post_tag[]> {
        if (isEmpty(postTagData)) throw new HttpException(409, "post tag data does't exist")

        const createPostTag: Post_tag[] = await this.post_tagRepository.insertMany(postTagData)

        return createPostTag
    }

    public async findPost_Tag(postId: string): Promise<{ data: Post_tag[], count: Number }> {
        if (isEmpty(postId)) throw new HttpException(409, "post Id id is empty")
        const tags: Post_tag[] = await this.post_tagRepository.findTagById({ postId: postId })
        const count: Number = await this.post_tagRepository.countTagByPostId({ postId: postId })
        if (!tags) throw new HttpException(409, "Post doesn't exist")
        return { data: tags, count }
    }
}