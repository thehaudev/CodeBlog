import { Vote_post } from "../interfaces/vote_post.interface";
import { VotePostModel } from "../models/vote_post.model";
import BaseRepository from "./base.repository";
export default class Vote_postRepository extends BaseRepository<Vote_post>{
    constructor() {
        super(VotePostModel)
    }
}