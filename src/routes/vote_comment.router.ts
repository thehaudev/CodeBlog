var express = require('express');
var router = express.Router();
import Vote_CommentController from '../controllers/vote_comment.controller';
import { DeleteVoteCommentDto, VoteCommentDto } from '../dtos/vote.dto';
import { verify } from '../middlewares/auth.middlewares'
import { validationMiddleware } from '../middlewares/validation.middlewares';
const voteCommentController = new Vote_CommentController

//POST, /api/v1/vote_comment
router.post("/", verify, validationMiddleware(VoteCommentDto, 'body'), voteCommentController.createVoteComment)

//PUT /api/v1/vote_comment
router.put("/", verify, validationMiddleware(VoteCommentDto, 'body'), voteCommentController.updateVoteComment)

//DELETE /api/v1/vote_comment
router.delete("/", verify, validationMiddleware(DeleteVoteCommentDto, 'body'), voteCommentController.deleteVoteComment)


export default router

