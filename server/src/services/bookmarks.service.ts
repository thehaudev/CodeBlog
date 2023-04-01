import { CreateBookmarkDto as BookmarkDto } from "../dtos/bookmarks.dto"
import { HttpException } from "../exceptions/HttpException"
import { Bookmark, BookmarkWithUser } from "../interfaces/ bookmarks.interface"
import { Post } from "../interfaces/posts.interface"
import { User } from "../interfaces/users.interface"
import { PostModel } from "../models/posts.model"
import { UserModel } from "../models/users.model"
import BookMarkRepository from "../repositories/bookmarks.repository"
import { isEmpty } from "../utils/validator.util"



export default class BookmarkService {
    private readonly bookmarkRepository: BookMarkRepository
    private readonly users = UserModel
    private readonly posts = PostModel


    constructor() {
        this.bookmarkRepository = new BookMarkRepository
    }

    public async bookmark(data: BookmarkDto): Promise<Bookmark> {
        if (isEmpty(data)) throw new HttpException(409, "bookmark data is empty")

        const checkPostId: Post = await this.posts.findById(data.postId)
        if (!checkPostId) throw new HttpException(409, "Post doesn't exist")

        const checkUserId: User = await this.users.findById(data.userId)
        if (!checkUserId) throw new HttpException(409, "User doesn't exist")

        const checkBookmark: Bookmark | null = await this.bookmarkRepository.findOne({ postId: data.postId, userId: data.userId })
        if (!checkBookmark) {
            const bookmark = await this.bookmarkRepository.create(data)
            return bookmark
        }
        else throw new HttpException(400, "Bookmark does exist")
    }

    public async deleteBookmark(data: BookmarkDto): Promise<void> {
        if (isEmpty(data)) throw new HttpException(409, "bookmark data is empty")

        const checkPostId = await this.posts.findById(data.postId)
        if (!checkPostId) throw new HttpException(409, "Post doesn't exist")

        const checkUserId = await this.users.findById(data.userId)
        if (!checkUserId) throw new HttpException(409, "User doesn't exist")

        const checkBookmark = await this.bookmarkRepository.findOne({ postId: data.postId, userId: data.userId })
        if (checkBookmark) await this.bookmarkRepository.delete(checkBookmark._id)
        else throw new HttpException(400, "Bookmark doesn't exist")
    }
    //Lấy tổng số bookmark của 1 bài viết
    public async countBookmarksOfPost(postId: string): Promise<Number> {
        if (isEmpty(postId)) throw new HttpException(409, 'Post id is empty')


        const checkPostId = await this.posts.findById(postId)
        if (!checkPostId) throw new HttpException(409, "Post doesn't exist")

        const number = await this.bookmarkRepository.countBookmarksOfPost({ postId: postId })
        return number;
    }

    public async findBookmarksOfPost(postId: string) {
        if (isEmpty(postId)) throw new HttpException(409, 'post id is empty')

        const checkPostId = this.posts.findById(postId)
        if (!checkPostId) throw new HttpException(409, "post id doesn't exist")

        const bookmarksOfPost = this.bookmarkRepository.findBookmarksOfPost({ postId: postId })
        return bookmarksOfPost
    }
}