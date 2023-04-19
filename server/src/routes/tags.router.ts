import { PostsController } from "../controllers/posts.controller";
import TagController from "../controllers/tags.controller";
import { IdDto } from "../dtos/objecId.dto";
import { verify } from "../middlewares/auth.middlewares";
import { adminRole } from "../middlewares/permission.middlerwares";
import { validationMiddleware } from "../middlewares/validation.middlewares";

var router = require("express").Router();

const tagController = new TagController();
const postController = new PostsController();
//GET /api/v1/tags
// router.get('/', tagController.getAllTags)
router.get("/", tagController.findAndSortTags);

//GET /api/v1/tags/:id
router.get(
  "/:id",
  validationMiddleware(IdDto, "params"),
  tagController.getTagById
);

//GET /api/v1/tags/:id/posts
router.get(
  "/:id/posts",
  validationMiddleware(IdDto, "params"),
  postController.getPostsByTagId
);

//POST /api/v1/tags
router.post("/", verify, adminRole, tagController.createTag);

//PUT /api/v1/tags/:id
router.put(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  adminRole,
  tagController.findTagAndUpdate
);

//DELETE /api/v1/tags/:id
router.delete(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  adminRole,
  tagController.deleteTag
);

export default router;
