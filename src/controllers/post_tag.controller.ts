import { NextFunction, Request, Response } from "express";
import { CreatePost_TagDto } from "../dtos/post_tag.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import Post_tag from "../interfaces/post_tag.interface";
import { User } from "../interfaces/users.interface";
import Post_tagService from "../services/post_tag.service";



export default class Post_tagController {
    public post_tagService = new Post_tagService

    public createPost_tag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dataPost_tag: CreatePost_TagDto[] = req.body

            const createPost_tag: Post_tag[] = await this.post_tagService.createPostTag(dataPost_tag)

            res.status(201).json({ data: createPost_tag, message: "created" })
        } catch (error) {
            next(error)
        }
    }
}