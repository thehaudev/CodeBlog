import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CreateNotificationDto } from "../dtos/notification.dto";
import { RequestWithUser, RequestWithUserAndComment } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import CommentService from "../services/comment.service";
import Follow_UserService from "../services/follow_user.service";
import NotificationService from "../services/notifications.service";
import PostsService from "../services/posts.service";


export default class NotificationController {
    public notificationService = new NotificationService
    public followUserService = new Follow_UserService
    public postService = new PostsService
    public commentsService = new CommentService

    public getNotificationsOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            const user: User = req.user

            let pagination: any = {
                skip: (+page - 1) * +limit,
                take: +limit,
                filter: { recipient: user._id }
            }

            const { notifications, total,totalNotRead } = await this.notificationService.findNotificationsOfUser(pagination)

            const count: number = notifications.length
            const total_pages = Math.floor(+total % +limit == 0 ? +total / +limit : +total / +limit + 1)
            pagination = {
                count: +count,
                total: +total,
                per_page: +limit,
                current_page: +page,
                total_pages: +total_pages
            }
            res.status(200).json({ count: count,totalNotRead, notifications, pagination })
        } catch (error) {
            next(error)
        }
    }

    public createNotificationWhenNewComment = async (req:RequestWithUserAndComment,res:Response,next:NextFunction)=>{
        try {
            const user =req.user;
            const comment = req.comment;
            const {link} = req.body
            if(comment.postId){
                const post = await this.postService.findPostById(comment.postId+"")
                const data:CreateNotificationDto = {
                    sender: user._id,
                    link: link,
                    recipient: post.user._id,
                    content: `<p><span style="color:#709bd0;">${user.display_name}</span > đã bình luận về bài viết <span style="color:#709bd0;">${post.title}</span></p>`
                }
               const notification =  await this.notificationService.createNotification(data)
               res.status(201).json({
                notification: notification, msg: 'create notification when new comment'
            })
            }
            if(comment.inReplyToComment){
                const inReplyToComment = await this.commentsService.findCommentById(comment.inReplyToComment+"")
                const post = await this.postService.findPostById(inReplyToComment.postId+"")
                const notificationCommentData:CreateNotificationDto = {
                    sender: user._id,
                    link: link,
                    recipient: inReplyToComment.userId,
                    content: `<p><span style="color:#709bd0;">${user.display_name}</span > đã trả lời bình luận của bạn</p>`
                }
                const notificationPostData:CreateNotificationDto = {
                    sender: user._id,
                    link: link,
                    recipient: post.user._id,
                    content: `<p><span style="color:#709bd0;">${user.display_name}</span > đã bình luận về bài viết <span style="color:#709bd0;">${post.title}</span></p>`
                }
                const notificationComment = await this.notificationService.createNotification(notificationCommentData)
               const notificationPost =  await this.notificationService.createNotification(notificationPostData)
               res.status(201).json({
                notifications: [notificationComment,notificationPost], msg: 'create notification when new comment'
               })
            }
        } catch (error) {
            console.log(error)
        }
    }

    public createNotificationWhenNewPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const postId = req.params.id
            const { link, content } = req.body

            const listFollowerUserId: ObjectId[] = await this.followUserService.getListFollowerIds(user._id)
            const listFollowerTagId: ObjectId[] = await this.postService.getListFollowerIds(postId)

            const listFollowerId: ObjectId[] = listFollowerUserId.concat(listFollowerTagId).filter(
                (value, index, self) => self.findIndex(v => v.toHexString() === value.toHexString()) === index
            );

            const notification: CreateNotificationDto[] = listFollowerId.map(e => {
                return {
                    sender: user._id,
                    link: link,
                    recipient: e.toString(),
                    content: content
                }
            })
            const createNotifications = await this.notificationService.createNotifications(notification)
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