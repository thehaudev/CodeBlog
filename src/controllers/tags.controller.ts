
import { NextFunction, Request, Response } from 'express'
import CreateTagDto from '../dtos/tag.dto'
import TagService from '../services/tag.service'

export default class TagController {
    public tagService = new TagService

    public createTag = async (req: Request, res: Response, next: NextFunction) => {
        const tagData: CreateTagDto = req.body

        const createTag = this.tagService.createTag(tagData)
        res.status(201).json({ data: createTag, message: "created" })
    }

}