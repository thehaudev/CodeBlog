import { Tag } from "../interfaces/tag.interface";
import { TagModel } from "../models/tags.model";
import BaseRepository from "./base.repository";

export default class TagRepository extends BaseRepository<Tag>{
    constructor() {
        super(TagModel)
    }
    async findAndSortTags(skip: number, take: number, search?: {}): Promise<Tag[]> {
        return await this.model.aggregate([
            {
                $match: search ? search : {}
            },
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: take },
            {
                $lookup: {
                    from: "post_tags",
                    localField: "_id",
                    foreignField: "tagId",
                    as: "posts"
                },
            },{
                $lookup:{
                    from:"follow_tags",
                    localField: "_id",
                    foreignField: "tagId",
                    as: "follows"
                }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    posts: { $size: "$posts" },
                    follows: { $size: "$follows" },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])
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

