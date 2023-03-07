import { NextFunction, Request, Response } from "express";
import { CreateBookmarkDto } from "../dtos/bookmarks.dto";
import { Bookmark } from "../interfaces/ bookmarks.interface";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import BookmarkService from "../services/bookmarks.service";


export default class BookmarkController {
    public bookmarkService = new BookmarkService

    public createBookmark = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const postId = req.body.postId
            const data: CreateBookmarkDto = {
                userId: user._id,
                postId: postId
            }

            const bookmark: {} = await this.bookmarkService.bookmark(data)
            res.status(200).json({ bookmark, message: "created" })
        } catch (error) {
            next(error)
        }
    }

    public deleteBookmark = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user: User = req.user
            const postId = req.body.postId
            const data: CreateBookmarkDto = {
                userId: user._id,
                postId: postId
            }

            await this.bookmarkService.deleteBookmark(data)
            res.status(200).json({ success: true, message: "deleted" })
        } catch (error) {
            next(error)
        }
    }
}