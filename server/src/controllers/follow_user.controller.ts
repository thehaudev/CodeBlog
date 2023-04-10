import { NextFunction, Response } from "express"
import { FollowUserDto } from "../dtos/follow.dto"
import { RequestWithUser } from "../interfaces/auth.interface"
import { Follow_User } from "../interfaces/follow_user.interface"
import Follow_UserService from "../services/follow_user.service"


export default class Follow_UsersController {
    public follow_userService = new Follow_UserService

    public findFollowUserOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data = { follower: user._id }

            const usersFollowing: Follow_User[]|null = await this.follow_userService.findFollowUserOfUser(data)
            res.status(201).json({ data: usersFollowing, message: "users following by user" })
        } catch (error) {
            next(error)
        }
    }

    public findFollowUser = async(req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const userId:string = req.query.userId +""
            const data: FollowUserDto = { userId:userId, follower: user._id }

            const followTag: Follow_User|null = await this.follow_userService.findFollowUser(data)

            res.status(201).json({ data: followTag, message: "find follow tag" })
        } catch (error) {
            next(error)
        }
    }

    public createFollowUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const userId= req.body.userId
            const data: FollowUserDto = { userId, follower: user._id }
            const createFollowUSer: Follow_User = await this.follow_userService.createFollowUser(data)

            res.status(201).json({ data: createFollowUSer, message: "follow" })
        } catch (error) {
            next(error)
        }
    }

    public deleteFollowUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const data: FollowUserDto = { ...req.body, follower: user._id }

            await this.follow_userService.deleteFollowUser(data)

            res.status(201).json({ message: "un follow" })
        } catch (error) {
            next(error)
        }
    }
}
