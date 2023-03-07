import { Follow_Tag } from "../interfaces/follow_tag.interface";
import { FollowTagModel } from "../models/follow_tag.model";
import BaseRepository from "./base.repository";

export default class Follow_TagRepository extends BaseRepository<Follow_Tag>{
    constructor() {
        super(FollowTagModel)
    }
}