import ViewsController from "../controllers/views.controller";
import { ViewsPost } from "../dtos/views.dto";
import { validationMiddleware } from "../middlewares/validation.middlewares";

var express = require("express");
var router = express.Router();
const viewsController = new ViewsController();
router.post(
  "/",
  validationMiddleware(ViewsPost, "body"),
  viewsController.createViews
);
export default router;
