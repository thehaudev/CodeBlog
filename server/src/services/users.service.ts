import { UserModel } from '../models/users.model'
import UserRepository from '../repositories/users.repository'
import { User } from '../interfaces/users.interface'
import { HttpException } from '../exceptions/HttpException'
import { isEmpty } from '../utils/validator.util'
import * as bcrypt from 'bcryptjs'
import { changeProfileDto, CreateUserDto, UpdateUserDto } from '../dtos/user.dto'
import { deleteFile } from '../utils/delete.util'

class UsersService {
    private readonly users = UserModel;
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async findAllUser(): Promise<User[]> {
        const users: User[] = await this.userRepository.find({ role: 0 });
        return users;
    }

    public async findUserById(userId: string): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

        const findUser: User = await this.users.findOne({ _id: userId, role: 0 });
        if (!findUser) throw new HttpException(409, "User doesn't exist");
        return findUser;
    }

    public async findUserByEmail(filter:any): Promise<User> {
        if (isEmpty(filter)) throw new HttpException(400, 'UserId is empty');

        const findUser: User = await this.users.findOne(filter);
        if (!findUser) throw new HttpException(409, "User doesn't exist");
        return findUser;
    }

    public async createUser(userData: CreateUserDto, avatar: string): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        let checkEmailExist = await this.users.findOne({ email: userData.email })
        if (checkEmailExist) throw new HttpException(409, `This email ${userData.email} already exists`);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.password || "", salt);

        const createUserData = await this.users.create(
            { ...userData, password: hashPassword, avatar: avatar })
        return createUserData
    }

    public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(userData.password || "", salt);
            userData = { ...userData, password: hashPassword };
        }

        const oldAvatar = userData.oldAvatar
        delete userData.oldAvatar


        const updateUserById: User = await this.users.findByIdAndUpdate(userId, userData);
        if (!updateUserById) throw new HttpException(409, "User doesn't exist");

        deleteFile(oldAvatar);

        return updateUserById;
    }

    public async changeProfile(id: string, userData: changeProfileDto): Promise<User> {
        if (isEmpty(id)) throw new HttpException(409, 'id user is empty')
        if (isEmpty(userData)) throw new HttpException(409, 'change profile data is empty')

        //xoa anh cu
        const oldAvatar = userData.oldAvatar
        delete userData.oldAvatar

        const updateUserById: User = await this.users.findByIdAndUpdate(id, userData);
        if (!updateUserById) throw new HttpException(409, "User doesn't exist");

        //xoa anh cu
        deleteFile(oldAvatar);

        return updateUserById;

    }

    public async deleteUser(userId: string): Promise<User> {
        const deleteUserById: User = await this.users.findByIdAndDelete(userId);
        if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

        return deleteUserById;
    }
}

export default UsersService;
