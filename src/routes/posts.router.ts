var router = require('express').Router()
import { validationMiddleware } from "../middlewares/validation.middlewares"
import { PostsController } from "../controllers/posts.controller"
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto"
import { CreateCommentDto } from "../dtos/comment.dto"
import { verify } from "../middlewares/auth.middlewares"
import { permissionPost } from "../middlewares/permission.middlerwares"
import { IdDto } from "../dtos/objecId.dto"

const postsController = new PostsController

//GET /api/v1/posts
router.get('/', postsController.getAllPosts)

//GET /api/v1/posts/:id
router.get('/:id', validationMiddleware(IdDto, "params"), postsController.getPostById)

//POST /api/v1/posts
router.post('/', verify, validationMiddleware(CreatePostDto, "body"), postsController.createPost)

//PUT /api/v1/posts/:id
router.put('/:id', validationMiddleware(IdDto, "params"), verify, permissionPost
    , validationMiddleware(UpdatePostDto, "body"), postsController.updatePost)

//DELETE /api/v1/posts:id
router.delete('/:id', validationMiddleware(IdDto, "params"), verify, permissionPost, postsController.deletePost)

//POST /api/v1/posts/:id/comments
router.post('/:id/comments', validationMiddleware(IdDto, "params"), verify
    , validationMiddleware(CreateCommentDto, "body"), postsController.comment)

//GET /api/v1/posts/:id/comments
router.get('/:id/comments', validationMiddleware(IdDto, "params"), postsController.getCommentsOfPost)

//GET /api/v1/posts/:id/bookmarks
router.get('/:id/bookmarks', validationMiddleware(IdDto, "params"), postsController.getBookmarksOfPost)

export default router