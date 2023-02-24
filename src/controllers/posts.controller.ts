import { NextFunction, Request, Response } from 'express'
import { CreateCommentDto } from '../dtos/comment.dto'
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto'
import { RequestWithUser } from '../interfaces/auth.interface'
import { Post, RequestWithPost } from '../interfaces/posts.interface'
import CommentService from '../services/comment.service'
import PostsService from '../services/posts.service'
export class PostsController {
    public postService = new PostsService
    public commentService = new CommentService

    public comment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id
            const userId = req.user._id
            const CommentData = { ...req.body, postId: postId, userId: userId }

            const createComment: CreateCommentDto = await this.commentService.comment(CommentData)
            res.status(201).json({ data: createComment, message: "comment" })
        } catch (error) {
            next(error)
        }
    }

    public getAllPosts = async (req: RequestWithPost, res: Response, next: NextFunction) => {
        try {

            const { limit = 10, page = 1, search = "", sort = "" } = req.query;
            //sort "","newest","trending"
            let curr: {} = {}
            if (sort == "newest") { curr = { created_at: -1 } }
            else if (sort == "trending") { curr = { views: -1 } }

            let pagination: any = {
                skip: (+page - 1) * +limit,
                take: +limit,
                search: search && { $text: { $search: `"${search}"` } },
                sort: curr
            };

            const posts: Post[] = await this.postService.findAllPosts(pagination);

            res.status(200).json({ data: posts, message: "get users" })

        } catch (error) {
            next(error)
        }
    }

    public getPostById = async (req: RequestWithPost, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            const post: Post = await this.postService.findPostById(id)
            res.status(200).json({ data: post, message: "get post by id" })
        } catch (error) {
            next(error)
        }
    }

    public createPost = async (req: RequestWithPost, res: Response, next: NextFunction) => {
        try {
            const postCreateData: CreatePostDto = req.body
            const postCreated: Post = await this.postService.createPost(postCreateData)
            res.status(201).json({ data: postCreated, message: "created" })
        } catch (error) {
            next(error)
        }
    }

    public updatePost = async (req: RequestWithPost, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const postUpdateData: UpdatePostDto = req.body
            const postUpdated: Post = await this.postService.updatePost(postUpdateData, id)
            res.status(200).json({ data: postUpdated, message: "updated" })
        } catch (error) {
            next(error)
        }
    }

    public deletePost = async (req: RequestWithPost, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            await this.postService.deletePost(id)
            res.status(200).json({ message: "deleted" })
        } catch (error) {
            next(error)
        }
    }

}