// Post Repository class

import { Post } from '../interfaces/posts.interface';
import { PostModel } from '../models/posts.model';
import BaseRepository from './base.repository';

export default class PostRepository extends BaseRepository<Post> {
    constructor() {
        super(PostModel);
    }

    async findAndSort(skip: number, take: number, sort?: {}, search?: {}): Promise<Post[]> {
        return this.model.find(search || {}).sort(sort || {}).skip(skip).limit(take).exec()
    }

}
