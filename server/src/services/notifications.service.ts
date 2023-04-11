import { CreateNotificationDto } from "../dtos/notification.dto";
import { HttpException } from "../exceptions/HttpException";
import Notification from "../interfaces/notifications.interface";
import { UserModel } from "../models/users.model";
import NotificationRepository from "../repositories/notification.repository";
import { isEmpty } from "../utils/validator.util";


export default class NotificationService {
    private readonly users = UserModel
    private readonly notificationRepository: NotificationRepository
    constructor() {
        this.notificationRepository = new NotificationRepository()
    }


    public async findNotificationsOfUser(data: any): Promise<{ notifications: Notification[], total: number,totalNotRead:number }> {
        const notifications: Notification[] = await this.notificationRepository.findAndSort(data.filter, data.skip, data.take)
        const total: number = await this.notificationRepository.countNotification()
        const totalNotRead: number = await this.notificationRepository.countNotificationNotRead(data.filter)
        return { notifications, total,totalNotRead }
    }

    public async createNotification(data: CreateNotificationDto): Promise<Notification|null> {

        if (isEmpty(data)) throw new HttpException(409, "notification data is empty")
        console.log(data)
        if(data.sender+""==data.recipient+"") return null
        else{
            const checkUser = await this.users.findById(data.recipient)
            if (!checkUser) throw new HttpException(409, "recipient doesn't exist")

            const checkSender = await this.users.findById(data.sender)
            if (!checkSender) throw new HttpException(409, "sender doesn't exist")

            const createNotification = await this.notificationRepository.create(data)
            return createNotification
        }

    }

    public async createNotifications(data: CreateNotificationDto[]): Promise<Notification[]> {
        if (isEmpty(data)) throw new HttpException(409, "notification data is empty")

        const createNotification: Notification[] = await this.notificationRepository.createMany(data)
        return createNotification
    }

    public async updateNotification(id: string, data: any): Promise<Notification | null> {
        if (isEmpty(data)) throw new HttpException(409, "notification data is empty")

        const checkNotificationId = await this.notificationRepository.findById(id)
        if (!checkNotificationId) throw new HttpException(409, "notification doesn't exist")

        const updateNotification = await this.notificationRepository.update(id, data)
        return updateNotification
    }

    public async deleteNotification(id: string): Promise<void> {
        if (isEmpty(id)) throw new HttpException(409, "notification id is empty")

        const checkNotificationId = await this.notificationRepository.findById(id)
        if (!checkNotificationId) throw new HttpException(409, "notification doesn't exist")

        await this.notificationRepository.delete(id)

    }

}