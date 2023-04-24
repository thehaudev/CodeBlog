import PostRepository from "../repositories/posts.repository";
import { Post } from "../interfaces/posts.interface";
import { HttpException } from "../exceptions/HttpException";
import { isEmpty } from "../utils/validator.util";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { UserModel } from "../models/users.model";
import { ObjectId } from "mongodb";
import TagRepository from "../repositories/tag.repository";

export default class PostsService {
  private readonly users = UserModel;
  private readonly postRepository: PostRepository;
  private readonly tagRepository: TagRepository = new TagRepository();

  constructor() {
    this.postRepository = new PostRepository();
  }

  public async getListFollowerIds(id: string): Promise<ObjectId[]> {
    if (isEmpty(id)) throw new HttpException(409, "post id is empty");

    const checkPost: Post | null = await this.postRepository.findById(id);
    if (!checkPost) throw new HttpException(409, "post doesn't exist");

    const listFollowerIds: ObjectId[] =
      await this.postRepository.findListFollowerTag(id);
    return listFollowerIds;
  }

  public async getRelatedPosts(id: string, limit: number): Promise<Post[]> {
    const posts: Post[] = await this.postRepository.getRelatedPosts(id, limit);
    return posts;
  }

  public async getPostsByTagId(
    filter: any,
    id: string
  ): Promise<{ posts: Post[]; total: Number }> {
    const posts: Post[] = await this.tagRepository.getPostsByTagId(
      id,
      filter.skip,
      filter.take,
      filter.sort,
      filter.search
    );
    const total: Number = await this.tagRepository.countPostsByTagId(
      id,
      filter.search
    );
    return { posts, total: total };
  }

  public async findPostsOfUser(
    filter: any,
    id: string
  ): Promise<{ posts: Post[]; total: Number }> {
    const posts: Post[] = await this.postRepository.findPostsOfUser(
      id,
      filter.skip,
      filter.take,
      filter.sort,
      filter.search
    );
    const total: Number = await this.postRepository.countPostsOfUser(
      id,
      filter.search
    );
    return { posts, total };
  }
  public async findAllPosts(
    filter?: any
  ): Promise<{ posts: Post[]; total: Number }> {
    const posts: Post[] = await this.postRepository.findAndSort(
      filter.skip,
      filter.take,
      filter.sort,
      filter.search
    );
    const total: Number = await this.postRepository.count(filter.search);
    return { posts, total };
  }

  public async findPostById(id: string): Promise<Post> {
    if (isEmpty(id)) throw new HttpException(400, "PostId is empty");
    const findPost: Post | null = await this.postRepository.findPostById(id);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    return findPost;
  }

  public async createPost(
    postData: CreatePostDto,
    userId: string
  ): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, "PostData is empty");

    const checkIdUser = await this.users.findById(userId);
    if (!checkIdUser) throw new HttpException(409, "User doesn't exist");

    const data = { ...postData, userId: userId };
    const createPost: Post = await this.postRepository.create(data);
    return createPost;
  }

  public async updatePost(
    postData: UpdatePostDto,
    postId: string
  ): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, "PostData is empty");

    // const checkIdUser = await this.users.findById(postData.userId)
    // if (!checkIdUser) throw new HttpException(409, "User doesn't exist")

    const updatePost: Post | null = await this.postRepository.update(
      postId,
      postData
    );
    if (!updatePost) throw new HttpException(409, "Post doesn't exist");

    return updatePost;
  }

  public async deletePost(postId: string): Promise<void> {
    if (isEmpty(postId)) throw new HttpException(409, "postId is empty");
    await this.postRepository.delete(postId);
  }
}
