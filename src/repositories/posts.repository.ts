import { Post } from '../interfaces/posts.interface';
import { PostModel } from '../models/posts.model';
import BaseRepository from './base.repository';

export default class PostRepository extends BaseRepository<Post> {
    constructor() {
        super(PostModel);
    }

    async findAndSort(skip: number, take: number, sort?: {}, search?: {}) {
        return await this.model.find(search || {}).sort(sort || {}).skip(skip).limit(take)
            .populate('userId', '-created_at -updated_at -__v')
            .populate({ path: 'tags', select: "tagId -postId -_id", populate: { path: 'tagId', select: 'title' } }).exec()

    }
    async findWithUserById(id: string): Promise<Post | null> {
        return this.model.findById(id).populate('userId').exec();
    }
    async count(): Promise<Number> {
        return this.model.count().exec();
    }
}