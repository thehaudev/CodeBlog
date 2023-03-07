import { HttpException } from "../exceptions/HttpException";
import { Follow_User } from "../interfaces/follow_user.interface";
import { UserModel } from "../models/users.model";
import Follow_UserRepository from "../repositories/follow_user.repository";
import { isEmpty } from "../utils/validator.util";


export default class Follow_UserService {
    private readonly users = UserModel
    private readonly follow_userRepository: Follow_UserRepository
    constructor() {
        this.follow_userRepository = new Follow_UserRepository()
    }

    public async createFollowUser(data: any): Promise<Follow_User> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkUserId = await this.users.findById(data.userId)
        if (!checkUserId) throw new HttpException(409, "user doesn't exist")

        const checkFollow = await this.follow_userRepository.findOne({ userId: data.userId, follower: data.follower })
        if (checkFollow) throw new HttpException(409, "follow does exist")

        const createFollowUser = await this.follow_userRepository.create(data)
        return createFollowUser
    }

    public async deleteFollowUser(data: any): Promise<void> {
        if (isEmpty(data)) throw new HttpException(409, "data is empty")

        const checkFollow = await this.follow_userRepository.findOne({ userId: data.userId, follower: data.follower })
        if (!checkFollow) throw new HttpException(409, "follow doesn't exist")

        await this.follow_userRepository.delete(checkFollow._id + "")
    }


}