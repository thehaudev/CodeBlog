var express = require('express');
var router = express.Router();
import AuthController from "../controllers/auth.controller"
import { verify } from "../middlewares/auth.middlewares";
import { validationMiddleware } from '../middlewares/validation.middlewares'
import { RegisterDto, LoginDto, ChangePasswordDto } from '../dtos/auth.dto'
const authController = new AuthController();
// POST /auth/register
// router.post('/register', register);
router.post('/register', validationMiddleware(RegisterDto, 'body'), authController.register);

// POST /auth/login
router.post('/login', validationMiddleware(LoginDto, 'body'), authController.login);

//PATCH /auth/change-pass
router.patch('/change-password', verify, validationMiddleware(ChangePasswordDto, 'body'), authController.changePassword)

//POST /auth/logout
router.post('/logout', verify, authController.logOut)

export default router