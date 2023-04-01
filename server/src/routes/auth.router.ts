var express = require('express');
var router = express.Router();
import AuthController from "../controllers/auth.controller"
import { verify, verifyRefreshToken } from "../middlewares/auth.middlewares";
import { validationMiddleware } from '../middlewares/validation.middlewares'
import { RegisterDto, LoginDto, ChangePasswordDto, sendMailDto, resetMailDto, resetPasswordDto } from '../dtos/auth.dto'
const authController = new AuthController();
// POST /auth/register
// router.post('/register', register);
router.post('/register', validationMiddleware(RegisterDto, 'body'), authController.register);

// POST /auth/login
router.post('/login', validationMiddleware(LoginDto, 'body'), authController.login);
// POST /auth/generateAccessToken
router.post('/generateAccessToken',verifyRefreshToken, authController.generateAccessToken);

//PATCH /auth/change-pass
router.patch('/change-password', verify, validationMiddleware(ChangePasswordDto, 'body'), authController.changePassword)

//POST /auth/logout
router.post('/logout', verify, authController.logOut)

//POST /auth/forgotPassword
router.post('/forgotPassword',validationMiddleware(sendMailDto,"body"),authController.forgotPassword)
export default router