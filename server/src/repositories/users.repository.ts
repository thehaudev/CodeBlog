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
