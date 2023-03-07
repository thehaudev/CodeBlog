var router = require('express').Router()
import { validationMiddleware, validationObjectId } from "../middlewares/validation.middlewares"
import { PostsController } from "../controllers/posts.controller"
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto"
import { CreateCommentDto } from "../dtos/comment.dto"
import { verify } from "../middlewares/auth.middlewares"

const postsController = new PostsController

//GET /api/v1/posts
router.get('/', postsController.getAllPosts)

//GET /api/v1/posts/:id
router.get('/:id', validationObjectId, postsController.getPostById)

//POST /api/v1/posts
router.post('/', verify, validationMiddleware(CreatePostDto, "body"), postsController.createPost)

//PUT /api/v1/posts/:id
router.put('/:id', validationObjectId, validationMiddleware(UpdatePostDto, "body"), postsController.updatePost)

//DELETE /api/v1/posts:id
router.delete('/:id', validationObjectId, postsController.deletePost)

//POST /api/v1/posts/:id/comments
router.post('/:id/comments', validationObjectId, verify, validationMiddleware(CreateCommentDto, "body"), postsController.comment)

//GET /api/v1/posts/:id/comments
router.get('/:id/comments', validationObjectId, postsController.getCommentsOfPost)

//GET /api/v1/posts/:id/bookmarks
router.get('/:id/bookmarks', validationObjectId, postsController.getBookmarksOfPost)

export default router