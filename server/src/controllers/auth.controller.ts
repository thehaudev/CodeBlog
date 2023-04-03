import { Response, Request, NextFunction } from 'express'
import { changePasswordData, RequestWithUser } from '../interfaces/auth.interface'
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import {google} from 'googleapis'
import UsersService from '../services/users.service';
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
const nodemailer = require('nodemailer');
require('dotenv').config()

class AuthController {

    public authService = new AuthService
    public userService = new UsersService


    public  forgotPassword =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body
            const token = await this.authService.forgotPassword(email)
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service:"Gmail",
                auth: {
                    type:'OAuth2',
                    user:'thehauhuynh5@gmail.com',
                    clientId:process.env.CLIENT_ID,
                    clientSecret:process.env.CLIENT_SECRET,
                    refreshToken:process.env.REFRESH_TOKEN,
                    accessToken:accessToken
                }
            });
            await transporter.sendMail({
                from: `"Fred Foo 👻" <thehauhuynh5@gmail.com>`,
                to: `${email}`,
                subject: "Hello ✔",
                html: `${token}`,
              });
            res.status(200).json({success:true,msg:"please check your email"})
        } catch (error) {
            next(error)
        }
    }

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
            let { user, refreshCookie, expiresIn, accessToken } = await this.authService.login(loginData);
            res.setHeader('Set-Cookie', [refreshCookie])
            res.status(200).json({ user, auth: accessToken, expiresIn: expiresIn, message: "login" })
        } catch (error) {
            next(error)
        }
    }

    public generateAccessToken = async(req:RequestWithUser,res:Response,next:NextFunction)=>{
        try {
            const user:User = req.user
            let {accessToken,expiresIn } = await this.authService.generateAccessToken(user)
            res.status(200).json({ user, auth: accessToken, expiresIn: expiresIn, message: "generate AccessToken" })
        } catch (error) {
            next(error)
        }
    }

    public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const body: changePasswordData = req.body;
            const user: User = req.user;
            const changePassword = await this.authService.changePassword(user, body);
            res.setHeader('Set-Cookie', ['RefreshToken=; Max-age=0']);
            res.status(201).json({ data: changePassword, message: "changePassword" })

        } catch (error) {
            next(error)
        }
    }

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            res.setHeader('Set-Cookie', ['RefreshToken=; Max-age=0']);
            // res.clearCookie("Authorization", { path: "/api/refresh_token" });
            res.status(200).json({ message: 'logout' });
        } catch (error) {
            next(error);
        }
    };

}

export default AuthController