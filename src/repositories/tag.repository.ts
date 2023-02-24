import { Tag } from "../interfaces/tag.interface";
import { TagModel } from "../models/tags.model";
import BaseRepository from "./base.repository";

export default class TagRepository extends BaseRepository<Tag>{
    constructor() {
        super(TagModel)
    }
}