import Follow_UsersController from "../controllers/follow_user.controller"
import { FollowUserDto } from "../dtos/follow.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require('express').Router()

const follow_userController = new Follow_UsersController
router.get('/', verify,validationMiddleware(FollowUserDto, 'query'),  follow_userController.findFollowUser)
//POST /api/v1/follow_user
router.post('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.createFollowUser)

//DELETE /api/v1/follow_user
router.delete('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.deleteFollowUser)

export default router