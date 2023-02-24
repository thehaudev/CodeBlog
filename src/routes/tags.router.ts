import TagController from "../controllers/tags.controller"

var router = require('express').Router()

const tagController = new TagController
router.post('/', tagController.createTag)

export default router