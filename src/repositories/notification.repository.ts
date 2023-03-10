import Notification from "../interfaces/notifications.interface";
import { NotificationModel } from "../models/notification.model";
import BaseRepository from "./base.repository";

export default class NotificationRepository extends BaseRepository<Notification>{
    constructor() {
        super(NotificationModel)
    }
    public async findAndSort(filter: {}, skip: number, take: number) {
        return await this.model.find(filter).skip(skip).limit(take).exec()
    }

    public async countNotification(): Promise<number> {
        return await this.model.count().exec()
    }
}