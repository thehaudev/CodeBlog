var express = require('express');
var router = express.Router();
import { upload } from '../utils/multer.util'
import { verify } from "../middlewares/auth.middlewares";
import { validationMiddleware } from "../middlewares/validation.middlewares"
import { changeProfileDto, CreateUserDto, IdDto, UpdateUserDto } from "../dtos/user.dto";
import UsersController from "../controllers/users.controller";

const usersController = new UsersController;

// router.get('/', getAllUsers)
router.get('/', usersController.getUsers)

//GET /users/:id
router.get('/:id', validationMiddleware(IdDto, "params"), usersController.getUserById)

//POST /users/
router.post('/', upload.single('avatar'), validationMiddleware(CreateUserDto, "body"), usersController.createUser)

//PUT /users/:id
router.put('/:id', upload.single('avatar'), validationMiddleware(UpdateUserDto, "body"), usersController.updateUser)

//Delete /users/:id
router.delete('/:id', validationMiddleware(IdDto, "params"), usersController.deleteUserById)

//patch /users/me
router.patch('/me', verify, upload.single('avatar'), validationMiddleware(changeProfileDto, "body"), usersController.changeProfile)

export default router;
