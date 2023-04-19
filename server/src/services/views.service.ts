import { ViewsPost } from "../dtos/views.dto";
import { HttpException } from "../exceptions/HttpException";
import PostRepository from "../repositories/posts.repository";
import ViewsRepository from "../repositories/views.repository";

class ViewsService {
  private readonly viewsRepository: ViewsRepository;
  private readonly postsRepository: PostRepository = new PostRepository();
  constructor() {
    this.viewsRepository = new ViewsRepository();
  }

  public async createView(data: ViewsPost) {
    const post = this.postsRepository.findById(data.postId);
    if (!post) throw new HttpException(409, "post doesn't exits");

    const view = await this.viewsRepository.create(data);
    return view;
  }
}

export default ViewsService;
