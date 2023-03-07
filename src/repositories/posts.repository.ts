// Post Repository class

import { Post } from '../interfaces/posts.interface';
import { PostModel } from '../models/posts.model';
import BaseRepository from './base.repository';

export default class PostRepository extends BaseRepository<Post> {
    constructor() {
        super(PostModel);
    }

    async findAndSort(skip: number, take: number, sort?: {}, search?: {}): Promise<Post[]> {
        return this.model.aggregate([{
            $lookup: {
                from: "post_tag",
                localField: "_id",
                foreignField: "postId",
                as: "Tags"
            }
        }])
        // return this.model.find(search || {}).sort(sort || {}).skip(skip).limit(take).populate('posts').populate('userId', '-created_at -updated_at').exec()
    }
    async findWithUserById(id: string): Promise<Post | null> {
        return this.model.findById(id).populate('userId').exec();
        // return this.model.findById(id).populate({ path: 'userId' }).exec();
    }
    async count(): Promise<Number> {
        return this.model.count().exec();
    }
}
// aggregate([
//     {
//         $lookup:
//         {
//             from: "user",
//             localField: "userId",
//             foreignField: "_id",
//             as: "user"
//         }
//     }
// ])
