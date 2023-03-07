var router = require('express').Router()
import ImageController from '../controllers/images.controller'
import { verify } from '../middlewares/auth.middlewares'
import { uploadImage } from '../middlewares/multer.middlewares'
const imageController = new ImageController

//GET /api/v1/images

//GET /api/v1/images/:id
router.get('/:id', imageController.getImageById)
//GET /api/v1/images/:userId
router.get('/users', verify, imageController.getImagesByUserId)
//POST /api/v1/images/uploads
router.post('/uploads', verify, uploadImage.single('image'), imageController.uploadImage)


export default router