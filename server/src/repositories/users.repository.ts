// User Repository class

import { User, UserWithoutPassword } from '../interfaces/users.interface';
import { UserModel } from '../models/users.model';
import BaseRepository from './base.repository';

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super(UserModel);
    }
    async findAndSortUser(skip:number,take:number,search?:{}):Promise<UserWithoutPassword[]>{
        return await this.model.aggregate([
            {
                $match: search ? search : {}
            },
            {
                $sort: { updatedAt: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: take
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "posts"
                },
            },{
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "userId",
                    as: "bookmarks"
                },
            },{
                $lookup: {
                    from: "follow_tags",
                    localField: "_id",
                    foreignField: "follower",
                    as: "followingTag"
                },
            },
            {
                $lookup: {
                    from: "follow_users",
                    localField: "_id",
                    foreignField: "follower",
                    as: "followingUser"
                },
            },
            {
                $lookup: {
                    from: "follow_users",
                    localField: "_id",
                    foreignField: "userId",
                    as: "followers"
                },
            },{
                $project:{
                    password:0
                }
            }
        ])
    }
    async findUser(email:string): Promise<User> {
        const res = await this.model.aggregate([
            {
                $match: {
                    email:email
                },

            },{
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "posts"
                },
            },{
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "userId",
                    as: "bookmarks"
                },
            },{
                $lookup: {
                    from: "follow_tags",
                    localField: "_id",
                    foreignField: "follower",
                    as: "followingTag"
                },
            },
            {
                $lookup: {
                    from: "follow_users",
                    localField: "_id",
                    foreignField: "follower",
                    as: "followingUser"
                },
            },
            {
                $lookup: {
                    from: "follow_users",
                    localField: "_id",
                    foreignField: "userId",
                    as: "followers"
                },
            }
        ])
        return res[0]
    }
    async count(search?:{}): Promise<Number> {
        try {
            const res = await this.model.aggregate([
                {
                    $match: search ? search : {}
                },
                {
                  $count: "count"
                }
            ])
            return res[0].count ;
        } catch (error) {
            return 0 ;
        }
    }
}
