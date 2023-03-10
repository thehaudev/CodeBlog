
import { Bookmark, BookmarkWithUser } from "../interfaces/ bookmarks.interface";
import { BookmarkModel } from "../models/bookmarks.model";
import BaseRepository from "./base.repository";

export default class BookMarkRepository extends BaseRepository<Bookmark>{
    constructor() {
        super(BookmarkModel);
    }

    async countBookmarksOfPost(filter = {}): Promise<Number> {
        return await this.model.find(filter).count().exec()
    }

    async findBookmarksOfPost(filter = {}) {
        return await this.model.find(filter).populate('user', '-created_at -updated_at -__v').exec()
    }
}