import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import NotificationService from "../services/notifications.service";


export default class NotificationController {
    public notificationService = new NotificationService

    public getNotificationsOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            const user: User = req.user

            let pagination: any = {
                skip: (+page - 1) * +limit,
                take: +limit,
                filter: { userId: user._id }
            }

            const { notifications, total } = await this.notificationService.findNotificationsOfUser(pagination)

            const count = notifications.length
            const total_pages = Math.floor(+total % +limit == 0 ? +total / +limit : +total / +limit + 1)
            pagination = {
                count: +count,
                total: +total,
                per_page: +limit,
                current_page: +page,
                total_pages: +total_pages
            }
            res.status(200).json({ count: count, notifications: { data: notifications, pagination } })
        } catch (error) {
            next(error)
        }
    }

    public createNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body

            const createNotification = await this.notificationService.createNotification(data)

            res.status(201).json({ notification: createNotification, message: "created" })
        } catch (error) {
            next(error)
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

    public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id

            await this.notificationService.deleteNotification(id)

            res.status(200).json({ message: "success" })
        } catch (error) {
            next(error)
        }
    }

}