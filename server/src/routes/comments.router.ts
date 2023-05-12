import CommentsController from "../controllers/comments.controller";
import { IdDto } from "../dtos/objecId.dto";
import { verify } from "../middlewares/auth.middlewares";
import { permissionComment } from "../middlewares/permission.middlerwares";
import { validationMiddleware } from "../middlewares/validation.middlewares";

const commentsController = new CommentsController();
var router = require("express").Router();
//DELETE /api/v1/comments/:id
router.delete(
  "/:id",
  validationMiddleware(IdDto, "params"),
  verify,
  permissionComment,
  commentsController.deleteComment
);

export default router;
