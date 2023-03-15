var express = require('express');
var router = express.Router();
import { uploadAvatar } from '../middlewares/multer.middlewares'
import { verify } from "../middlewares/auth.middlewares";
import { validationMiddleware } from "../middlewares/validation.middlewares"
import { changeProfileDto, CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import UsersController from "../controllers/users.controller";
import { IdDto } from '../dtos/objecId.dto';
import { permissionUser } from '../middlewares/permission.middlerwares';
import NotificationController from '../controllers/notification.controller';

const usersController = new UsersController;
const notificationController = new NotificationController;
// router.get('/', getAllUsers)
router.get('/', usersController.getUsers)

//get /api/v1/users/notifications
router.get('/notifications', verify, notificationController.getNotificationsOfUser)

//GET /users/:id
router.get('/:id', validationMiddleware(IdDto, "params"), usersController.getUserById)

//POST /users/
router.post('/', verify, permissionUser, uploadAvatar.single('avatar'),
    validationMiddleware(CreateUserDto, "body"), usersController.createUser)

//PUT /users/:id
router.put('/:id', validationMiddleware(IdDto, "params"), verify, permissionUser,
    validationMiddleware(UpdateUserDto, "body"), uploadAvatar.single('avatar'),
    usersController.updateUser)

//Delete /users/:id
router.delete('/:id', validationMiddleware(IdDto, "params"), verify, permissionUser,
    usersController.deleteUserById)

//patch /users/me
router.patch('/me', verify, validationMiddleware(changeProfileDto, "body"), uploadAvatar.single('avatar'),
    usersController.changeProfile)



export default router;
