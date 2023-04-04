import { Post } from '../interfaces/posts.interface';
import { PostModel } from '../models/posts.model';
import BaseRepository from './base.repository';
import { ObjectId } from 'mongodb'
export default class PostRepository extends BaseRepository<Post> {
    constructor() {
        super(PostModel);
    }

    async findListFollowerTag(id: string): Promise<ObjectId[]> {
        const followTags = await this.model.aggregate([
            {
                $match: { _id: new ObjectId(id) }
            }, {
                $lookup: {
                    from: 'post_tags',
                    localField: "_id",
                    foreignField: "postId",
                    as: "post_tags"
                }
            }, {
                $lookup: {
                    from: 'follow_tags',
                    localField: "post_tags.tagId",
                    foreignField: "tagId",
                    as: "follow_tags"
                }
            }, {
                $project: {
                    follow_tags: {
                        follower: 1
                    }
                }
            }
        ])
        const listFollowerId = followTags[0].follow_tags.map((e: any) => e.follower)
        return listFollowerId
    }

    async findAndSortWithPopulate(skip: number, take: number, sort?: {}, search?: {}) {
        //argument
        return await this.model.find(search || {}).sort(sort || {}).skip(skip).limit(take)
            .populate('user', '-created_at -updated_at -__v')
            .populate({
                path: 'tags', select: "tagId -postId -_id",
                populate: { path: 'tagId', select: 'title' }
            }).exec()
    }

    async findAndSort(skip: number, take: number, sort: {}, search?: {}): Promise<Post[]> {
        return await this.model.aggregate([
            {
                $match: {
                    $and: [search ? search : {},
                    { status: true }]
                }
            },
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: take },
            {
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "postId",
                    as: "bookmarks"
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                },
            },
            {
                $lookup: {
                    from: "view_posts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "views"
                },
            },
            {
                $lookup: {
                    from: "vote_posts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "votes"
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
            , {
                $lookup: {
                    from: "post_tags",
                    localField: "_id",
                    foreignField: "postId",
                    pipeline: [
                        { $limit: 6 }
                    ],
                    as: "tags"
                }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags.tagId",
                    foreignField: "_id",
                    as: "tags"
                }
            },
            {
                $project: {
                    user: { password: 0 }
                }
            }
            , {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    status: 1,
                    bookmarks: { $size: "$bookmarks" },
                    views: { $size: "$views" },
                    comments:{$size:"$comments"},
                    votes: {
                        // $sum: {
                        //     $cond: {
                        //         if: { $eq: ["$votes.type", "Upvote"] },
                        //         then: 1,
                        //         else: {
                        //             if: { $eq: ["$votes.type", "Downvote"] },
                        //             then: -1,
                        //             else: 0
                        //         }
                        //     }
                        // }
                        $reduce: {
                            input: "$votes",
                            initialValue: 0,
                            in: {
                                $add: [
                                    "$$value",
                                    {
                                        $cond: {
                                            if: { $eq: ["$$this.type", "Upvote"] },
                                            then: 1,
                                            else: {
                                                $cond: {
                                                    if: { $eq: ["$$this.type", "Downvote"] },
                                                    then: -1,
                                                    else: 0
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    user: { $arrayElemAt: ["$user", 0] },
                    // tags: "$tags.title"
                    tags: {
                        _id: 1,
                        title: 1
                    },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])
    }



    async findPostById(id: string): Promise<Post | null> {
        const post: Post[] = await this.model.aggregate([
            {
                $match: {
                    $and: [
                        { _id: new ObjectId(id) }, { status: true }
                    ]

                }
            },
            {
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "postId",
                    as: "bookmarks"
                },
            },{
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                },
            },
            {
                $lookup: {
                    from: "view_posts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "views"
                },
            },
            {
                $lookup: {
                    from: "vote_posts",
                    localField: "_id",
                    foreignField: "postId",
                    as: "votes"
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
            , {
                $lookup: {
                    from: "post_tags",
                    localField: "_id",
                    foreignField: "postId",
                    pipeline: [
                        { $limit: 6 }
                    ],
                    as: "tags"
                }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags.tagId",
                    foreignField: "_id",
                    as: "tags"
                }
            },
            {
                $project: {
                    user: { password: 0 }
                }
            }
            , {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    status: 1,
                    bookmarks: { $size: "$bookmarks" },
                    views: { $size: "$views" },
                    comments:{$size: "$comments"},
                    votes: {
                        // $sum: {
                        //     $cond: {
                        //         if: { $eq: ["$votes.type", "Upvote"] },
                        //         then: 1,
                        //         else: {
                        //             if: { $eq: ["$votes.type", "Downvote"] },
                        //             then: -1,
                        //             else: 0
                        //         }
                        //     }
                        // }
                        $reduce: {
                            input: "$votes",
                            initialValue: 0,
                            in: {
                                $add: [
                                    "$$value",
                                    {
                                        $cond: {
                                            if: { $eq: ["$$this.type", "Upvote"] },
                                            then: 1,
                                            else: {
                                                $cond: {
                                                    if: { $eq: ["$$this.type", "Downvote"] },
                                                    then: -1,
                                                    else: 0
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    user: { $arrayElemAt: ["$user", 0] },
                    // tags: "$tags.title"
                    tags: {
                        _id: 1,
                        title: 1
                    },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])
        return post[0]
    }

    async count(): Promise<Number> {
        return this.model.count().exec();
    }
}