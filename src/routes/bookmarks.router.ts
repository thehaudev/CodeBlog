import BookmarkController from "../controllers/bookmarks.controller"
import { verify } from "../middlewares/auth.middlewares"
import { validationObjectId } from "../middlewares/validation.middlewares"

var router = require("express").Router()
const bookmarkController = new BookmarkController

//POST /api/v1/bookmarks
router.post('/', verify, bookmarkController.createBookmark)
//DELETE /api/v1/bookmarks
router.delete('/', verify, bookmarkController.deleteBookmark)

export default router