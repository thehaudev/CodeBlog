import Post_tag from "../interfaces/post_tag.interface";
import BaseRepository from "./base.repository";
import { PostTagModel } from "../models/post_tag.model";
import { CreatePost_TagDto } from "../dtos/post_tag.dto";
import { Post } from "../interfaces/posts.interface";
// import Post_TagDto from "../dtos/post_tag.dto";
export default class Post_tagRepository extends BaseRepository<Post_tag> {
  constructor() {
    super(PostTagModel);
  }

  public async insertMany(array: CreatePost_TagDto[]): Promise<Post_tag[]> {
    return await this.model.insertMany(array);
  }

  public async findTagById(filter: {}) {
    return await this.model
      .find(filter)
      .limit(5)
      .populate("tagId", "title")
      .exec();
  }
  //Lấy tổng số tag của 1 post
  public async countTagByPostId(filter: {}): Promise<Number> {
    return await this.model.find(filter).count().exec();
  }
  public async deletePostTag(postId: string): Promise<void> {
    await this.model.deleteMany({ postId: postId });
  }
}
