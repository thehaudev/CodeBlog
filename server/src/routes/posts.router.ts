var router = require("express").Router();
import { validationMiddleware } from "../middlewares/validation.middlewares";
import { PostsController } from "../controllers/posts.controller";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { CreateCommentDto } from "../dtos/comment.dto";
import { verify } from "../middlewares/auth.middlewares";
import { permissionPost } from "../middlewares/permission.middlerwares";
import { IdDto } from "../dtos/objecId.dto";

const postsController = new PostsController();

//GET /api/v1/posts
router.get("/", postsController.getAllPosts);

//GET /api/v1/posts/bookmarks/:userId
router.get(
  "/bookmarks/:id",
  validationMiddleware(IdDto, "params"),
  postsController.getBookmarkPostsOfUser
);

//GET /api/v1/posts/trash/:userId
router.get(
  "/trash/:id",
  validationMiddleware(IdDto, "params"),
  postsController.getPostsInTrashOfUser
);
//GET /api/v1/posts/:id
router.get(
  "/:id",
  validationMiddleware(IdDto, "params"),
  postsController.getPostById
);

//GET /api/v1/posts/:id/related
router.get(
  "/:id/related",
  validationMiddleware(IdDto, "params"),
  postsController.getRelatedPosts
);

//POST /api/v1/posts
router.post(
  "/",
  verify,
  validationMiddleware(CreatePostDto, "body"),
  postsController.createPost
);

//PUT /api/v1/posts/:id
router.put(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  permissionPost,
  validationMiddleware(UpdatePostDto, "body"),
  postsController.updatePost
);
//PATCH /api/v1/posts/:id
router.patch(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  permissionPost,
  validationMiddleware(UpdatePostDto, "body"),
  postsController.updatePost
);
//DELETE /api/v1/posts:id
router.delete(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  permissionPost,
  postsController.deletePost
);

//POST /api/v1/posts/:id/comments
router.post(
  "/:id/comments",
  validationMiddleware(IdDto, "params"),
  verify,
  validationMiddleware(CreateCommentDto, "body"),
  postsController.comment
);

//GET /api/v1/posts/:id/comments
router.get(
  "/:id/comments",
  validationMiddleware(IdDto, "params"),
  postsController.getCommentsOfPost
);

export default router;
