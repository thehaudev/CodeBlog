import NotificationController from "../controllers/notification.controller"
import { verify } from "../middlewares/auth.middlewares"

var router = require('express').Router()

const notificationController = new NotificationController

//GET /api/v1/notifications
router.get("/", verify, notificationController.getNotificationsOfUser)

//post /api/v1/notification
router.post("/", notificationController.createNotification)

//put /api/v1/notification/:id
router.put("/:id", notificationController.updateNotification)

//delete /api/v1/notification/:id
router.delete("/:id", notificationController.deleteNotification)
