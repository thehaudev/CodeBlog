import Follow_UsersController from "../controllers/follow_user.controller"
import { verify } from "../middlewares/auth.middlewares"

var router = require('express').Router()

const follow_userController = new Follow_UsersController

//POST /api/v1/follow_tag
router.post('/', verify, follow_userController.createFollowUser)

//DELETE /api/v1/follow_tag
router.delete('/', verify, follow_userController.deleteFollowUser)

export default router