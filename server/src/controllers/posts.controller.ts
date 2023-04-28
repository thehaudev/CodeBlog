import { NextFunction, Request, Response } from "express";
import { CreateCommentDto } from "../dtos/comment.dto";
import { UpdatePostDto } from "../dtos/post.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { Comment } from "../interfaces/comment.interface";
import { Post, RequestWithPost } from "../interfaces/posts.interface";
import { User } from "../interfaces/users.interface";
import { PostModel } from "../models/posts.model";
import BookmarkService from "../services/bookmarks.service";
import CommentService from "../services/comment.service";
import PostsService from "../services/posts.service";
import Post_tagService from "../services/post_tag.service";
import UsersService from "../services/users.service";
export class PostsController {
  public postService = new PostsService();
  public commentService = new CommentService();
  public userService = new UsersService();
  public postTagService = new Post_tagService();
  public bookmarkService = new BookmarkService();

  public comment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user._id;
      let postId: any = req.params.id;
      if (req.body.inReplyToComment) {
        const CommentData: CreateCommentDto = { ...req.body, userId: userId };
        const createComment: Comment =
          await this.commentService.commentReplyComment(CommentData);
        res
          .status(201)
          .json({ comment: createComment, message: "comment reply comment" });
      } else {
        const CommentData: CreateCommentDto = {
          ...req.body,
          postId: postId,
          userId: userId,
        };
        const createComment: Comment = await this.commentService.comment(
          CommentData
        );
        res
          .status(201)
          .json({ comment: createComment, message: "comment post" });
      }
    } catch (error) {
      next(error);
    }
  };

  public getCommentsOfPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.id;
      const { limit = 5, page = 1 } = req.query;
      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
      };
      const commentOfPost: Comment[] =
        await this.commentService.findCommentsOfPost(postId, pagination);
      const total: Number = await this.commentService.totalCommentOfPost(
        postId
      );
      const count = commentOfPost.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        total: +total,
        count: +count,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };
      res.status(200).json({
        data: { count: count, comments: commentOfPost, pagination },
        message: "get comments",
      });
    } catch (error) {
      next(error);
    }
  };

  public getBookmarkPostsOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit = 10, page = 1, search = null, sort = "" } = req.query;

      const id: string = req.params.id;
      let curr: any = null;
      if (sort == "latest") {
        curr = { createdAt: -1 };
      } else if (sort == "views") {
        curr = { views: -1 };
      } else if (sort == "votes") {
        curr = { votes: -1 };
      } else if (sort == "comments") {
        curr = { comments: -1 };
      }
      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && {
          $or: [
            { title: { $regex: `${search}`, $options: "i" } },
            { content: { $regex: `${search}`, $options: "i" } },
          ],
        },
        sort: curr,
      };
      const { posts, total } =
        await this.bookmarkService.findBookmarkPostsOfUser(pagination, id);

      const count = posts.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };

      res.status(200).json({
        count: count,
        posts: posts,
        pagination,
        msg: "get bookmark posts of user",
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostsInTrashOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        limit = 10,
        page = 1,
        search = null,
        sort = "latest",
      } = req.query;

      const id: string = req.params.id;
      let curr: {} = {};
      if (sort == "latest") {
        curr = { createdAt: -1 };
      } else if (sort == "default") {
        search && (curr = { score: { $meta: "textScore" } });
        !search && (curr = { createdAt: -1 });
      } else if (sort == "views") {
        curr = { views: -1 };
      } else if (sort == "votes") {
        curr = { votes: -1 };
      } else if (sort == "comments") {
        curr = { comments: -1 };
      }

      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && {
          $text: {
            $search: `${search}`,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        },
        sort: curr,
      };
      const { posts, total } = await this.postService.findPostsInTrashOfUser(
        pagination,
        id
      );

      const count = posts.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };

      res.status(200).json({
        count: count,
        posts: posts,
        pagination,
        msg: "get bookmark posts of user",
      });
    } catch (error) {
      next(error);
    }
  };

  public getRelatedPosts = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    const { limit = 10 } = req.query;
    const { id } = req.params;
    const posts = await this.postService.getRelatedPosts(id, +limit);

    res.status(200).json({ posts: posts, msg: "get related posts" });
  };

  public getPostsByTagId = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit = 10, page = 1, search = null, sort = "" } = req.query;
      const id = req.params.id;
      let curr: {} = {};
      if (sort == "latest") {
        curr = { createdAt: -1 };
      } else if (sort == "views") {
        curr = { views: -1 };
      } else if (sort == "votes") {
        curr = { votes: -1 };
      } else if (sort == "comments") {
        curr = { comments: -1 };
      }

      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && {
          $or: [
            { title: { $regex: `${search}`, $options: "i" } },
            { content: { $regex: `${search}`, $options: "i" } },
          ],
        },
        sort: curr,
      };
      const { posts, total } = await this.postService.getPostsByTagId(
        pagination,
        id
      );
      const count = posts.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };

      res.status(200).json({
        count: count,
        posts: posts,
        pagination,
        msg: "get posts by tag id",
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllPosts = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        limit = 10,
        page = 1,
        search = null,
        sort = "latest",
      } = req.query;
      //sort "","newest","trending"
      let curr: {} = {};
      if (sort == "latest") {
        curr = { createdAt: -1 };
      } else if (sort == "default") {
        search && (curr = { score: { $meta: "textScore" } });
        !search && (curr = { createdAt: -1 });
      } else if (sort == "views") {
        curr = { views: -1 };
      } else if (sort == "votes") {
        curr = { votes: -1 };
      } else if (sort == "comments") {
        curr = { comments: -1 };
      }

      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && {
          $text: {
            $search: `${search}`,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        },
        sort: curr,
      };
      const { posts, total } = await this.postService.findAllPosts(pagination);
      const count = posts.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };

      res.status(200).json({ count: count, posts: posts, pagination });
    } catch (error) {
      next(error);
    }
  };

  public getPostsOfUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        limit = 10,
        page = 1,
        search = null,
        sort = "latest",
      } = req.query;
      const id = req.params.id;
      //sort "","newest","trending"
      let curr: {} = {};
      if (sort == "latest") {
        curr = { createdAt: -1 };
      } else if (sort == "default") {
        search && (curr = { score: { $meta: "textScore" } });
        !search && (curr = { createdAt: -1 });
      } else if (sort == "views") {
        curr = { views: -1 };
      } else if (sort == "votes") {
        curr = { votes: -1 };
      } else if (sort == "comments") {
        curr = { comments: -1 };
      }

      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && {
          $text: {
            $search: `${search}`,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        },
        sort: curr,
      };
      const { posts, total } = await this.postService.findPostsOfUser(
        pagination,
        id
      );
      const count = posts.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };

      res.status(200).json({ count: count, posts: posts, pagination });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      let post: Post = await this.postService.findPostById(id);

      // const countBookmark = await this.bookmarkService.countBookmarksOfPost(id)

      // const { data, count: total } = await this.postTagService.findPost_Tag(id)
      // const count = data.length
      // const tags = data.map(e => e.tagId)
      // const total_pageTags = Math.floor(+total % 5 == 0 ? +total / 5 : +total / 5 + 1)
      // const tagPagination = {
      //     count: +count,
      //     total: +total,
      //     per_page: 5,
      //     current_page: 1,
      //     total_pages: +total_pageTags
      // }
      // const tagData = { data: tags, meta: tagPagination }

      // const data2 = { ...post['_doc'], user: post['user'], countBookmark: countBookmark, tags: tagData }

      res.status(200).json({ post: post, message: "get post by id" });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const postCreateData = req.body;
      const postCreated: any = await this.postService.createPost(
        postCreateData,
        user._id
      );
      const data = { ...postCreated["_doc"], user: user };
      res.status(201).json({ data: data, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const postUpdateData: UpdatePostDto = req.body;
      const postUpdated: Post = await this.postService.updatePost(
        postUpdateData,
        id
      );
      res.status(200).json({ data: postUpdated, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (
    req: RequestWithPost,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      await this.postService.deletePost(id);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
