import { HttpException } from "../exceptions/HttpException";
import { changePasswordData } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";
import { createAccessToken, createRefreshTokenCookie } from "../utils/jwt.util";
import { isEmpty } from "../utils/validator.util";
import { LoginDto, RegisterDto } from "../dtos/auth.dto"

const bcrypt = require('bcryptjs')
require('dotenv').config()


class AuthService {
    public user = UserModel

    public async register(userData: RegisterDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const checkEmailExist = await UserModel.findOne({ email: userData.email });
        if (checkEmailExist) throw new HttpException(409, 'Email is exist');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.password, salt);

        const createUserData: User = await this.user.create({ ...userData, password: hashPassword });
        return createUserData;

    }

    public async login(userData: LoginDto): Promise<{ user: User, refreshCookie: string, expiresIn: number,accessToken:string}> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const user: User = await this.user.findOne({ email: userData.email });
        if (!user) throw new HttpException(409, 'Email or Password is not correct');

        const checkPassword = await bcrypt.compare(userData.password, user.password);
        if (!checkPassword) throw new HttpException(409, 'Email or Password is not correct');

        const {accessToken,expiresIn} = createAccessToken(user)
        const refreshCookie = createRefreshTokenCookie(user)
        return { user, refreshCookie, expiresIn, accessToken }
    }

    public async generateAccessToken(user:User){
        if(isEmpty(user)) throw new HttpException(400,"userData is empty")
        const {accessToken,expiresIn} = createAccessToken(user)
        return { expiresIn, accessToken }
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
    public async forgotPassword(email:string): Promise<string> {
        if(isEmpty(email)) throw new HttpException(400,"userData is empty")
        const user: User = await this.user.findOne({ email: email });
        if (!user) throw new HttpException(409, 'Email is exist');
        const {accessToken} = createAccessToken(user)
        return accessToken;
    }


}

export default AuthService