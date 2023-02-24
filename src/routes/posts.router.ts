var router = require('express').Router()
import { validationMiddleware } from "../middlewares/validation.middlewares"
import { PostsController } from "../controllers/posts.controller"
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto"
import { CreateCommentDto } from "../dtos/comment.dto"
import { verify } from "../middlewares/auth.middlewares"

const postsController = new PostsController

//GET /api/v1/posts
router.get('/', postsController.getAllPosts)

//GET /api/v1/posts
router.get('/:id', postsController.getPostById)

//POST /api/v1/posts
router.post('/', validationMiddleware(CreatePostDto, "body"), postsController.createPost)

//PUT /api/v1/posts
router.put('/:id', validationMiddleware(UpdatePostDto, "body"), postsController.updatePost)

//DELETE /api/v1/posts
router.delete('/:id', postsController.deletePost)

//POST /api/v1/posts/:id/comments
router.post('/:id/comments', verify, validationMiddleware(CreateCommentDto, "body"), postsController.comment)

export default router