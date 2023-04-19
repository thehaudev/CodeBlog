import { Post } from "../interfaces/posts.interface";
import { Tag } from "../interfaces/tag.interface";
import { TagModel } from "../models/tags.model";
import BaseRepository from "./base.repository";
import { ObjectId } from "mongodb";

export default class TagRepository extends BaseRepository<Tag> {
  constructor() {
    super(TagModel);
  }
  async findAndSortTags(
    skip: number,
    take: number,
    search?: {}
  ): Promise<Tag[]> {
    return await this.model.aggregate([
      {
        $match: search ? search : {},
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: take },
      {
        $lookup: {
          from: "post_tags",
          localField: "_id",
          foreignField: "tagId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "follow_tags",
          localField: "_id",
          foreignField: "tagId",
          as: "follows",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          posts: { $size: "$posts" },
          follows: { $size: "$follows" },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
  }
  async count(search?: {}): Promise<Number> {
    try {
      const res = await this.model.aggregate([
        {
          $match: search ? search : {},
        },
        {
          $count: "count",
        },
      ]);
      return res[0].count;
    } catch (error) {
      return 0;
    }
  }

  async countPostsByTagId(id: string, search?: {}): Promise<Number> {
    const res = await this.model.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: "post_tags",
          localField: "_id",
          foreignField: "tagId",
          as: "post_tags",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post_tags.postId",
          foreignField: "_id",
          as: "posts",
        },
      },
    ]);
    return res[0].posts.length;
  }

  async getPostsByTagId(
    id: string,
    skip: number,
    take: number,
    sort: {},
    search?: {}
  ): Promise<Post[]> {
    const res = await this.model.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: "post_tags",
          localField: "_id",
          foreignField: "tagId",
          as: "post_tags",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post_tags.postId",
          foreignField: "_id",
          pipeline: [
            {
              $match: {
                $and: [search ? search : {}, { status: true }],
              },
            },
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: take },
            {
              $lookup: {
                from: "bookmarks",
                localField: "_id",
                foreignField: "postId",
                as: "bookmarks",
              },
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
              },
            },
            {
              $lookup: {
                from: "view_posts",
                localField: "_id",
                foreignField: "postId",
                as: "views",
              },
            },
            {
              $lookup: {
                from: "vote_posts",
                localField: "_id",
                foreignField: "postId",
                as: "votes",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $lookup: {
                from: "post_tags",
                localField: "_id",
                foreignField: "postId",
                pipeline: [{ $limit: 6 }],
                as: "tags",
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tags.tagId",
                foreignField: "_id",
                as: "tags",
              },
            },
            {
              $project: {
                user: { password: 0 },
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                content: 1,
                status: 1,
                coverImageUrl: 1,
                bookmarks: { $size: "$bookmarks" },
                views: { $size: "$views" },
                comments: { $size: "$comments" },
                votes: {
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
                                else: 0,
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                user: { $arrayElemAt: ["$user", 0] },
                // tags: "$tags.title"
                tags: {
                  _id: 1,
                  title: 1,
                },
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
          as: "posts",
        },
      },
    ]);
    return res[0].posts;
  }
}
