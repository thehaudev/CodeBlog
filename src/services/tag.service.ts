import CreateTagDto from "../dtos/tag.dto";
import { HttpException } from "../exceptions/HttpException";
import { Tag } from "../interfaces/tag.interface";
import TagRepository from "../repositories/tag.repository";
import { isEmpty } from "../utils/validator.util";


export default class TagService {
    private readonly tagRepository: TagRepository

    constructor() {
        this.tagRepository = new TagRepository()
    }

    public async createTag(tagData: CreateTagDto): Promise<Tag> {
        if (isEmpty(tagData)) throw new HttpException(409, "title doesn't exist")
        return await this.tagRepository.create(tagData)
    }
}