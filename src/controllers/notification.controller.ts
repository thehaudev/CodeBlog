import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CreateNotificationDto } from "../dtos/notification.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import Follow_UserService from "../services/follow_user.service";
import NotificationService from "../services/notifications.service";
import PostsService from "../services/posts.service";


export default class NotificationController {
    public notificationService = new NotificationService
    public followUserService = new Follow_UserService
    public postService = new PostsService

    public getNotificationsOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            const user: User = req.user

            let pagination: any = {
                skip: (+page - 1) * +limit,
                take: +limit,
                filter: { recipient: user._id }
            }

            const { notifications, total } = await this.notificationService.findNotificationsOfUser(pagination)

            const count: number = notifications.length
            const total_pages = Math.floor(+total % +limit == 0 ? +total / +limit : +total / +limit + 1)
            pagination = {
                count: +count,
                total: +total,
                per_page: +limit,
                current_page: +page,
                total_pages: +total_pages
            }
            res.status(200).json({ count: count, notifications, pagination })
        } catch (error) {
            next(error)
        }
    }

    public createNotificationWhenNewPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const postId = req.params.id
            const { link, content } = req.body

            const listFollowerUserId: ObjectId[] = await this.followUserService.getListFollowerIds(user._id)
            const listFollowerTagId: ObjectId[] = await this.postService.getListFollowerIds(postId)

            //hợp 2 mảng và loại bỏ phần tử trùng nhau
            // const listFollowerId = [...listFollowerUserId, ...listFollowerTagId];
            const listFollowerId: ObjectId[] = listFollowerUserId.concat(listFollowerTagId).filter(
                (value, index, self) => self.findIndex(v => v.toHexString() === value.toHexString()) === index
            );

            const notification: CreateNotificationDto[] = listFollowerId.map(e => {
                return {
                    sender: new ObjectId(user._id),
                    link: link,
                    recipient: e,
                    content: content
                }
            })
            const createNotifications = await this.notificationService.createNotificationsWithNewPost(notification)
            res.status(201).json({
                notifications: createNotifications, msg: 'create notifications when new post'
            })
        } catch (error) {
            next(error)
        }
    }

    public readNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const filter = { isRead: true }

            const updateNotification = await this.notificationService.updateNotification(id, filter)

            res.status(200).json({ updateNotification, message: "updated" })
        } catch (error) {

        }
    }

    public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const data = req.body

            const updateNotification = await this.notificationService.updateNotification(id, data)

            res.status(200).json({ updateNotification, message: "updated" })
        } catch (error) {
            next(error)
        }
    }



    // public createNotification = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const data = req.body

    //         const createNotification = await this.notificationService.createNotification(data)

    //         res.status(201).json({ notification: createNotification, message: "created" })
    //     } catch (error) {
    //         next(error)
    //     }
    // }



    // public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const id = req.params.id

    //         await this.notificationService.deleteNotification(id)

    //         res.status(200).json({ message: "success" })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

}