import Follow_UsersController from "../controllers/follow_user.controller"
import { FollowUserDto } from "../dtos/follow.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require('express').Router()

const follow_userController = new Follow_UsersController

//POST /api/v1/follow_tag
router.post('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.createFollowUser)

//DELETE /api/v1/follow_tag
router.delete('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.deleteFollowUser)

export default router