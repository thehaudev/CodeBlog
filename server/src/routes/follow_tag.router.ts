import Follow_TagController from "../controllers/follow_tag.controller"
import { FollowTagDto } from "../dtos/follow.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require('express').Router()

const follow_tagController = new Follow_TagController
//GET /api/v1/follow_tag
router.get('/', verify, validationMiddleware(FollowTagDto, 'query'), follow_tagController.findFollowTag)
//POST /api/v1/follow_tag
router.post('/', verify, validationMiddleware(FollowTagDto, 'body'), follow_tagController.createFollowTag)

//DELETE /api/v1/follow_tag
router.delete('/', verify, validationMiddleware(FollowTagDto, 'body'), follow_tagController.deleteFollowTag)

export default router