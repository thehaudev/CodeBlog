var express = require('express');
var router = express.Router();
import Vote_PostController from "../controllers/vote_post.controller";
import { verify } from '../middlewares/auth.middlewares'
const votePostController = new Vote_PostController

//POST, /api/v1/vote_post
router.post("/", verify, votePostController.createVotePost)

//PUT /api/v1/vote_post
router.put("/", verify, votePostController.updateVotePost)

//DELETE /api/v1/vote_post
router.delete("/", verify, votePostController.deleteVotePost)


export default router

