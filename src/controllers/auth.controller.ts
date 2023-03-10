import { Response, Request, NextFunction } from 'express'
import { changePasswordData, RequestWithUser } from '../interfaces/auth.interface'
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
require('dotenv').config()

class AuthController {

    public authService = new AuthService

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: RegisterDto = req.body
            const register: User = await this.authService.register(userData);

            res.status(201).json({ data: register, message: "register" })
        } catch (error) {
            next(error)
        }
    }
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loginData: LoginDto = req.body
            let { user, cookie, token, expiresIn } = await this.authService.login(loginData);
            res.setHeader('Set-Cookie', [cookie])
            res.status(200).json({ data: user, auth: token, expiresIn: expiresIn, message: "login" })
        } catch (error) {
            next(error)
        }
    }

    public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const body: changePasswordData = req.body;
            const user: User = req.user;
            const changePassword = await this.authService.changePassword(user, body);

            res.status(201).json({ data: changePassword, message: "register" })

        } catch (error) {
            next(error)
        }
    }

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            // res.clearCookie("Authorization", { path: "/api/refresh_token" });
            res.status(200).json({ message: 'logout' });
        } catch (error) {
            next(error);
        }
    };

}

export default AuthController