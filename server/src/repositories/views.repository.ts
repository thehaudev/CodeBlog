import { ViewsPost } from "../interfaces/viewPost.interface";
import { ViewPostModel } from "../models/view_post.model";
import BaseRepository from "./base.repository";
export default class ViewsRepository extends BaseRepository<ViewsPost> {
  constructor() {
    super(ViewPostModel);
  }

  public async deleteViewsOfPost(postId: string): Promise<void> {
    await this.model.deleteMany({ postId: postId });
  }
}
