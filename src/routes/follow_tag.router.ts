import Follow_TagController from "../controllers/follow_tag.controller"
import { verify } from "../middlewares/auth.middlewares"

var router = require('express').Router()

const follow_tagController = new Follow_TagController

//POST /api/v1/follow_tag
router.post('/', verify, follow_tagController.createFollowTag)

//DELETE /api/v1/follow_tag
router.delete('/', verify, follow_tagController.deleteFollowTag)

export default router