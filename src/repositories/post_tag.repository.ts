import Post_tag from "../interfaces/post_tag.interface";
import BaseRepository from "./base.repository";
import { PostTagModel } from "../models/post_tag.model";
export default class Post_tagRepository extends BaseRepository<Post_tag>{
    constructor() {
        super(PostTagModel)
    }

}