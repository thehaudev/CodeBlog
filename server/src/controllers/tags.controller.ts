import { NextFunction, Request, Response } from "express";
import CreateTagDto from "../dtos/tag.dto";
import { Tag } from "../interfaces/tag.interface";
import TagService from "../services/tag.service";

export default class TagController {
  public tagService = new TagService();

  public getAllTags = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllTags: Tag[] = await this.tagService.findTag();
      res.status(200).json({ data: findAllTags, message: "get all tags" });
    } catch (error) {
      next(error);
    }
  };

  public findAndSortTags = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit = 20, page = 1, search = null, sort } = req.query;
      //sort "","newest","trending"

      let pagination: any = {
        skip: (+page - 1) * +limit,
        take: +limit,
        search: search && { title: { $regex: `${search}`, $options: "i" } },
      };
      if (sort == "posts") pagination = { ...pagination, sort: { posts: -1 } };
      const { tags, total } = await this.tagService.findAndSortTag(pagination);
      const count = tags.length;
      const total_pages = Math.floor(
        +total % +limit == 0 ? +total / +limit : +total / +limit + 1
      );
      pagination = {
        count: +count,
        total: +total,
        per_page: +limit,
        current_page: +page,
        total_pages: +total_pages,
      };
      res.status(200).json({
        data: tags,
        pagination: pagination,
        message: "get and filter tags",
      });
    } catch (error) {
      next(error);
    }
  };

  public getTagById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const findTagById: Tag = await this.tagService.findTagById(id);
      res.status(200).json({
        data: findTagById,
        message: "find tag by id",
      });
    } catch (error) {}
  };

  public createTag = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const tagData: CreateTagDto = req.body;

    const createTag: Tag = await this.tagService.createTag(tagData);
    res.status(201).json({ data: createTag, message: "created" });
  };

  public findTagAndUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const data: CreateTagDto = req.body;
    const findTagAndUpdate: Tag = await this.tagService.updateTag(data, id);
    res.status(200).json({ data: findTagAndUpdate, message: "updated" });
  };
  public deleteTag = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    await this.tagService.deleteTag(id);
    res.status(200).json({ message: "deleted" });
  };
}
