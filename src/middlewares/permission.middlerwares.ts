import { NextFunction, Response } from "express"
import { HttpException } from "../exceptions/HttpException"
import { RequestWithUser } from "../interfaces/auth.interface"
import { Post } from "../interfaces/posts.interface"
import { User } from "../interfaces/users.interface"
import PostRepository from "../repositories/posts.repository"

const postRepository = new PostRepository()

export const adminRole = (req: RequestWithUser, res: Response, next: NextFunction) => {

    if (req.user.role != 1) res.status(403).json({ msg: "not allowed" })
    next()

}

///permission posts

export const permissionPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const post: Post | null = await postRepository.findById(req.params.id)
        if (!canCRUDPost(req.user, post)) throw new HttpException(403, "not allowed")
        next()
    } catch (error) {
        next(error)
    }
}

const canCRUDPost = (user: User, post: Post | null) => {
    return (user.role == 1 || user._id + "" === post?.userId + "")
}

//permission users

export const permissionUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        if (!canCRUDUser(req.user, req.params.id)) throw new HttpException(403, "not allowed")
        next()
    } catch (error) {
        next(error)
    }
}

const canCRUDUser = (user: User, id: string) => {
    return (user.role == 1 || user._id + "" == id)
}


