import { NextFunction, Response } from "express"
import { HttpException } from "../exceptions/HttpException"
import { RequestWithUser } from "../interfaces/auth.interface"
import Notification from "../interfaces/notifications.interface"
import { Post } from "../interfaces/posts.interface"
import { User } from "../interfaces/users.interface"
import NotificationRepository from "../repositories/notification.repository"
import PostRepository from "../repositories/posts.repository"

const postRepository = new PostRepository()
const notificationRepository = new NotificationRepository()

export const adminRole = (req: RequestWithUser, res: Response, next: NextFunction) => {

    if (req.user.role != 1) res.status(403).json({ msg: "not allowed" })
    next()

}

///permission posts

export const permissionPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const post: Post | null = await postRepository.findById(req.params.id)
        if (!post) throw new HttpException(400, "post don't exist")
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

export const permissionRecipient = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const notification: Notification | null = await notificationRepository.findById(req.params.id)
        if (!notification) throw new HttpException(400, "notification don't exist")
        if (!canCRUDUser(req.user, notification.recipient.toString())) throw new HttpException(403, "not allowed")
        next()
    } catch (error) {
        next(error)
    }
}

const canCRUDUser = (user: User, id: string) => {
    return (user.role == 1 || user._id + "" == id)
}


