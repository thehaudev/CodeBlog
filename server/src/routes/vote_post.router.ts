var express = require('express');
var router = express.Router();
import Vote_PostController from "../controllers/vote_post.controller";
import { IdDto } from "../dtos/objecId.dto";
import { VotePostDto, DeleteVotePostDto } from "../dtos/vote.dto";
import { verify } from '../middlewares/auth.middlewares'
import { validationMiddleware } from "../middlewares/validation.middlewares";
const votePostController = new Vote_PostController

//GET, /api/v1/vote_post
router.get("/:id", verify, validationMiddleware(IdDto, 'params'), votePostController.getVotePost)
//POST, /api/v1/vote_post
router.post("/", verify, validationMiddleware(VotePostDto, 'body'), votePostController.createVotePost)

//PUT /api/v1/vote_post
router.put("/", verify, validationMiddleware(VotePostDto, 'body'), votePostController.updateVotePost)

//DELETE /api/v1/vote_post
router.delete("/", verify, validationMiddleware(DeleteVotePostDto, 'body'), votePostController.deleteVotePost)

export default router

