import NotificationController from "../controllers/notification.controller"
import { IdDto } from "../dtos/objecId.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"
import { permissionPost, permissionRecipient } from '../middlewares/permission.middlerwares'
import { CreateNotificationDto } from "../dtos/notification.dto"
var router = require('express').Router()

const notificationController = new NotificationController

//POST api/v1/notifications/new-post/:id
router.post('/new-post/:id', validationMiddleware(IdDto, 'params'), validationMiddleware(CreateNotificationDto, 'body'), verify, permissionPost, notificationController.createNotificationWhenNewPost)

//patch api/v1/notifications/read
router.patch('/read/:id', validationMiddleware(IdDto, 'params'), verify, permissionRecipient, notificationController.readNotification)


export default router
