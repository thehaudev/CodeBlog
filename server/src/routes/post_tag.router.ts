import Post_tagController from "../controllers/post_tag.controller"
import { verify } from "../middlewares/auth.middlewares"
import { adminRole } from "../middlewares/permission.middlerwares"
import { validationObjectIdOfPost_tag } from "../middlewares/validation.middlewares"
var router = require('express').Router()
const post_tagController = new Post_tagController
//POST /api/v1/post_tag
router.post('/', verify, validationObjectIdOfPost_tag, post_tagController.createPost_tag)

export default router