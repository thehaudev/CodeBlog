import TagController from "../controllers/tags.controller"
import { IdDto } from "../dtos/objecId.dto"
import { verify } from "../middlewares/auth.middlewares"
import { adminRole } from "../middlewares/permission.middlerwares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require('express').Router()

const tagController = new TagController
//GET /api/v1/tags
// router.get('/', tagController.getAllTags)
router.get('/', tagController.findAndSortTags)

//GET /api/v1/tags/:id
router.get('/:id', validationMiddleware(IdDto, 'params'), tagController.getTagById)

//POST /api/v1/tags
router.post('/', verify, adminRole, tagController.createTag)

//PUT /api/v1/tags/:id
router.put('/:id', validationMiddleware(IdDto, 'params'), verify, adminRole, tagController.findTagAndUpdate)

//DELETE /api/v1/tags/:id
router.delete('/:id', validationMiddleware(IdDto, 'params'), verify, adminRole, tagController.deleteTag)


//tao mot thong bao khi tag minh theo doi co bai viet moi
//post /api/v1/tag/:id/notification
router.post("/:id/notification",)

export default router