import { HttpException } from "../exceptions/HttpException";
import { changePasswordData, DataInTokenData, TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";
import { isEmpty } from "../utils/validator.util";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


class AuthService {
    public user = UserModel

    public async register(userData: any): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const checkEmailExist = await UserModel.findOne({ email: userData.email });
        if (checkEmailExist) throw new HttpException(409, 'Email is exist');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.password, salt);

        const createUserData: User = await this.user.create({ ...userData, password: hashPassword });
        return createUserData;

    }

    public async login(userData: any): Promise<{ user: User, cookie: string }> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const user: User = await this.user.findOne({ email: userData.email });
        if (!user) throw new HttpException(409, 'Email or Password is not correct');

        const checkPassword = await bcrypt.compare(userData.password, user.password);
        if (!checkPassword) throw new HttpException(409, 'Email or Password is not correct');

        const token = this.createToken(user)
        const cookie = this.createCookie(token)

        return { user, cookie }
    }

    public async changePassword(userData: User, body: changePasswordData): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const checkPassword = await bcrypt.compare(body.password, userData.password);
        if (!checkPassword) throw new HttpException(409, 'Password is not correct');


        if (body.newPassword == body.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(body.newPassword, salt);
            const changePassword = await UserModel.findByIdAndUpdate(userData._id, { password: hashPassword })

            return changePassword
        }
        else throw new HttpException(409, "Passwords do not match")

    }

    public createToken(userData: User): TokenData {
        const dataStoredInToken: DataInTokenData = { _id: userData._id }
        const expiresIn: number = 60 * 60 * 24
        const secretKey: string | undefined = process.env.SECRET_KEY

        return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn: expiresIn }) }
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
    }
}

export default AuthService