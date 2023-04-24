// User Repository class

import { User, UserWithoutPassword } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";
import BaseRepository from "./base.repository";

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  async findAndSortUser(
    skip: number,
    take: number,
    sort?: {},
    search?: {}
  ): Promise<UserWithoutPassword[]> {
    console.log(sort, search);
    return await this.model.aggregate([
      {
        $match: search ? search : {},
      },

      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "userId",
          as: "bookmarks",
        },
      },
      {
        $lookup: {
          from: "follow_tags",
          localField: "_id",
          foreignField: "follower",

          as: "followingTag",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "follower",
          as: "followingUser",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "userId",
          as: "followers",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          role: 1,
          display_name: 1,
          avatar: 1,
          bio: 1,
          location: 1,
          about: 1,
          updatedAt: 1,
          createdAt: 1,
          posts: { $size: "$posts" },
          bookmarks: { $size: "$bookmarks" },
          followingTag: { $size: "$followingTag" },
          followingUser: { $size: "$followingUser" },
          followers: { $size: "$followers" },
        },
      },
      {
        $sort: sort || { updatedAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: take,
      },
    ]);
  }
  async findUser(email: string): Promise<User> {
    const res = await this.model.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "userId",
          as: "bookmarks",
        },
      },
      {
        $lookup: {
          from: "follow_tags",
          localField: "_id",
          foreignField: "follower",
          pipeline: [
            {
              $lookup: {
                from: "tags",
                localField: "tagId",
                foreignField: "_id",
                as: "tag",
              },
            },
            { $unwind: "$tag" },
          ],
          as: "followingTag",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "follower",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $project: {
                password: 0,
              },
            },
          ],
          as: "followingUser",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "userId",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "follower",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $project: {
                password: 0,
              },
            },
          ],
          as: "followers",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          role: 1,
          display_name: 1,
          bio: 1,
          avatar: 1,
          location: 1,
          about: 1,
          posts: { $size: "$posts" },
          bookmarks: { $size: "$bookmarks" },
          followingUser: 1,
          followingTag: 1,
          followers: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return res[0];
  }

  async findWithEmail(email: string): Promise<User> {
    const res = await this.model.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "userId",
          as: "bookmarks",
        },
      },
      {
        $lookup: {
          from: "follow_tags",
          localField: "_id",
          foreignField: "follower",
          as: "followingTag",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "follower",
          as: "followingUser",
        },
      },
      {
        $lookup: {
          from: "follow_users",
          localField: "_id",
          foreignField: "userId",
          as: "followers",
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          password: 1,
          role: 1,
          display_name: 1,
          bio: 1,
          avatar: 1,
          location: 1,
          about: 1,
          posts: { $size: "$posts" },
          bookmarks: { $size: "$bookmarks" },
          followers: 1,
          followingUser: 1,
          followingTag: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return res[0];
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
}
