var express = require('express');
var router = express.Router();
import Vote_CommentController from '../controllers/vote_comment.controller';
import { verify } from '../middlewares/auth.middlewares'
const voteCommentController = new Vote_CommentController

//POST, /api/v1/vote_comment
router.post("/", verify, voteCommentController.createVoteComment)

//PUT /api/v1/vote_comment
router.put("/", verify, voteCommentController.updateVoteComment)

//DELETE /api/v1/vote_comment
router.delete("/", verify, voteCommentController.deleteVoteComment)


export default router

