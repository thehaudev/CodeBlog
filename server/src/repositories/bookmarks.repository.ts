import { Bookmark, BookmarkWithUser } from "../interfaces/ bookmarks.interface";
import { Post } from "../interfaces/posts.interface";
import { BookmarkModel } from "../models/bookmarks.model";
import { ObjectId } from "mongodb";
import BaseRepository from "./base.repository";

export default class BookMarkRepository extends BaseRepository<Bookmark> {
  constructor() {
    super(BookmarkModel);
  }

  async countBookmarkPostsOfUser(id: string, search: {}): Promise<Number> {
    try {
      const res = await this.model.aggregate([
        {
          $match: { userId: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $and: [search ? search : {}, { status: true }],
                },
              },
            ],
            as: "posts",
          },
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

  async findBookmarkPostsOfUser(
    id: string,
    skip: number,
    take: number,
    sort: {},
    search?: {}
  ): Promise<Post[]> {
    const res = await this.model.aggregate([
      {
        $match: { userId: new ObjectId(id) },
      },

      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          pipeline: [
            {
              $match: {
                $and: [search ? search : {}, { status: true }],
              },
            },
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
            { $sort: sort },
            { $skip: skip },
            { $limit: take },
          ],
          as: "posts",
        },
      },
      {
        $project: {
          posts: 1,
        },
      },
      {
        $unwind: "$posts",
      },
    ]);
    return res.map((e) => e.posts);
  }
}
