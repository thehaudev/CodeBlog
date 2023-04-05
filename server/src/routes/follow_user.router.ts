import Follow_UsersController from "../controllers/follow_user.controller"
import { FollowUserDto } from "../dtos/follow.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require('express').Router()

const follow_userController = new Follow_UsersController
router.get('/:following', verify,  follow_userController.getFollow)
//POST /api/v1/follow_user
router.post('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.createFollowUser)

//DELETE /api/v1/follow_user
router.delete('/', verify, validationMiddleware(FollowUserDto, 'body'), follow_userController.deleteFollowUser)

export default router