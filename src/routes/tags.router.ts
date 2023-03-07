import TagController from "../controllers/tags.controller"

var router = require('express').Router()

const tagController = new TagController
//GET /api/v1/tags
router.get('/', tagController.getAllTags)

//GET /api/v1/tags/:id
router.get('/:id', tagController.getTagById)

//POST /api/v1/tags
router.post('/', tagController.createTag)

//PUT /api/v1/tags/:id
router.put('/:id', tagController.findTagAndUpdate)

//DELETE /api/v1/tags/:id
router.delete('/:id', tagController.deleteTag)

export default router