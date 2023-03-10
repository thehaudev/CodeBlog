import BookmarkController from "../controllers/bookmarks.controller"
import { IdDto } from "../dtos/objecId.dto"
import { verify } from "../middlewares/auth.middlewares"
import { validationMiddleware } from "../middlewares/validation.middlewares"

var router = require("express").Router()
const bookmarkController = new BookmarkController

//POST /api/v1/bookmarks
router.post('/:id', validationMiddleware(IdDto, "params"), verify, bookmarkController.createBookmark)
//DELETE /api/v1/bookmarks
router.delete('/:id', validationMiddleware(IdDto, "params"), verify, bookmarkController.deleteBookmark)

export default router