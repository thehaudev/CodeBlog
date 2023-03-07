
import { NextFunction, Request, Response } from 'express'
import { CreateImageDto } from '../dtos/imagesPost.dto'
import { RequestWithUser } from '../interfaces/auth.interface'
import { ImagePost } from '../interfaces/imagesPost.interface'
import ImagesPostService from '../services/imagesPost.service'

export default class ImageController {
    public imageService = new ImagesPostService

    public uploadImage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            console.log(req.user._id)
            const imagedata: CreateImageDto = {
                userId: req.user._id,
                name: req.file?.filename,
                basename: req.file?.originalname,
                path: req.file?.path
            }

            const createImage = await this.imageService.createImage(imagedata)

            res.status(201).json({ data: createImage })
        } catch (error) {
            next(error)

        }
    }

    public getImagesByUserId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const id = "" + req.user._id
            const findImages = await this.imageService.findImagesByUserId(id)
            res.status(200).json({ data: findImages })
        } catch (error) {
            next(error)
        }
    }

    public getImageById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const findImageById: ImagePost = await this.imageService.findImageById(id)
            res.status(200).json({ data: findImageById })
        } catch (error) {
            next(error)
        }
    }
}