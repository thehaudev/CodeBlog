var express = require('express');
var router = express.Router();
import { DeleteVoteCommentDto, VoteCommentDto } from '../dtos/vote.dto';
import { verify } from '../middlewares/auth.middlewares'
import { validationMiddleware } from '../middlewares/validation.middlewares';



export default router

