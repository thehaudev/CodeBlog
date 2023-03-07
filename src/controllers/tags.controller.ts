
import { NextFunction, Request, Response } from 'express'
import CreateTagDto from '../dtos/tag.dto'
import TagService from '../services/tag.service'

export default class TagController {
    public tagService = new TagService

    public getAllTags = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var search: any = ""
            if (req.query.search) search = req.query.search
            search = {
                title: { '$regex': `${search}`, '$options': 'i' }
            }
            const findAllTags = await this.tagService.findTag(search)
            res.status(200).json({ data: findAllTags, message: "get all tags" })
        } catch (error) {
            next(error)
        }
    }

    public getTagById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const findTagById = await this.tagService.findTagById(id)
            res.status(200).json({
                data: findTagById,
                message: "find tag by id"
            })
        } catch (error) {

        }
    }

    public createTag = async (req: Request, res: Response, next: NextFunction) => {
        const tagData: CreateTagDto = req.body

        const createTag = await this.tagService.createTag(tagData)
        res.status(201).json({ data: createTag, message: "created" })
    }

    public findTagAndUpdate = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const data: CreateTagDto = req.body
        const findTagAndUpdate = await this.tagService.updateTag(data, id)
        res.status(200).json({ data: findTagAndUpdate, message: "updated" })
    }
    public deleteTag = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        await this.tagService.deleteTag(id)
        res.status(200).json({ message: "deleted" })
    }

}